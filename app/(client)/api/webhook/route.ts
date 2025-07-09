import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "@/actions/createCheckoutSession";

export async function POST(req: NextRequest) {
  console.log("[System] Processing payment webhook");

  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !webhookSecret) {
    console.error("[Security] Invalid webhook request");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`[System] Handling ${event.type} event`);
  } catch {
    console.error("[Security] Webhook verification failed");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case "checkout.session.async_payment_succeeded":
        await handleAsyncPaymentSucceeded(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.async_payment_failed":
        await handleAsyncPaymentFailed(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.expired":
        await handleCheckoutSessionExpired(event.data.object as Stripe.Checkout.Session);
        break;
      default:
        console.log(`[System] Received unhandled event type`);
    }
  } catch {
    console.error("[System] Error processing webhook");
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log("[Order] Processing new checkout");

  const existingOrders = await backendClient.fetch(
    '*[_type=="order" && stripeCheckoutSessionId == $sessionId]',
    { sessionId: session.id }
  );

  if (existingOrders.length > 0) {
    console.log("[Order] Duplicate checkout detected");
    return;
  }

  const status = session.payment_status === "paid" ? "paid" : "pending";
  const order = await createOrderInSanity(session, status);

  if (status === "paid") {
    await updateStockForOrder(order._id);
    console.log("[Inventory] Updated product quantities");
  }

  if (session.invoice) {
    try {
      const invoice = await stripe.invoices.retrieve(
        typeof session.invoice === "string" ? session.invoice : session.invoice.id
      );
      await attachInvoiceToOrder(order._id, invoice);
      console.log("[Order] Added invoice details");
    } catch {
      console.error("[Order] Failed to add invoice");
    }
  }
}

async function handleInvoicePaid(invoiceRaw: Stripe.Invoice) {
  console.log("[Payment] Processing invoice payment");

  const invoice = await stripe.invoices.retrieve(invoiceRaw.id, {
    expand: ["payment_intent", "charge.payment_intent", "subscription"]
  });

  let orders = await backendClient.fetch(
    '*[_type == "order" && invoice.id == $invoiceId]',
    { invoiceId: invoice.id }
  );

  if (orders.length > 0) {
    console.log("[Order] Invoice already processed");
    return;
  }

  if (invoice.subscription) {
    const subscription = typeof invoice.subscription === "string"
      ? await stripe.subscriptions.retrieve(invoice.subscription)
      : invoice.subscription;

    if (subscription.metadata?.checkoutSessionId) {
      orders = await backendClient.fetch(
        '*[_type == "order" && stripeCheckoutSessionId == $sessionId]',
        { sessionId: subscription.metadata.checkoutSessionId }
      );
    }
  }

  if (orders.length === 0) {
    let paymentIntentId: string | undefined;

    if (typeof invoice.payment_intent === "string") {
      paymentIntentId = invoice.payment_intent;
    } else if (invoice.payment_intent?.id) {
      paymentIntentId = invoice.payment_intent.id;
    } else if (invoice.charge) {
      const charge = typeof invoice.charge === "string"
        ? await stripe.charges.retrieve(invoice.charge)
        : invoice.charge;
      paymentIntentId = charge.payment_intent as string;
    }

    if (paymentIntentId) {
      orders = await backendClient.fetch(
        '*[_type == "order" && stripePaymentIntentId == $paymentIntentId]',
        { paymentIntentId }
      );
    }
  }

  if (orders.length === 0) {
    console.warn("[Order] Could not match invoice to order");
    return;
  }

  await attachInvoiceToOrder(orders[0]._id, invoice);
}

async function handleAsyncPaymentSucceeded(session: Stripe.Checkout.Session) {
  console.log("[Payment] Completed async payment");

  const orders = await backendClient.fetch(
    '*[_type=="order" && stripeCheckoutSessionId == $sessionId]',
    { sessionId: session.id }
  );

  if (orders.length === 0) {
    console.warn("[Order] Could not find matching order");
    return;
  }

  const order = orders[0];
  await updateOrderStatus(order._id, "paid");
  await updateStockForOrder(order._id);
  console.log("[Inventory] Updated product quantities");
}

async function handleAsyncPaymentFailed(session: Stripe.Checkout.Session) {
  console.log("[Payment] Async payment failed");

  const orders = await backendClient.fetch(
    '*[_type=="order" && stripeCheckoutSessionId == $sessionId]',
    { sessionId: session.id }
  );

  if (orders.length > 0) {
    await updateOrderStatus(orders[0]._id, "failed");
  }
}

async function handleCheckoutSessionExpired(session: Stripe.Checkout.Session) {
  console.log("[Order] Checkout session expired");

  const orders = await backendClient.fetch(
    '*[_type=="order" && stripeCheckoutSessionId == $sessionId]',
    { sessionId: session.id }
  );

  if (orders.length > 0) {
    await updateOrderStatus(orders[0]._id, "expired");
  }
}

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  status: "pending" | "paid"
) {
  const { id, amount_total, currency, metadata, payment_intent, total_details, invoice } = session;
  const {
    orderNumber,
    customerName,
    customerEmail,
    clerkUserId,
    address: rawAddress,
  } = metadata as Metadata;

  const parsedAddress =
    rawAddress && typeof rawAddress === "string"
      ? JSON.parse(rawAddress)
      : rawAddress ?? null;

  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const sanityProducts = lineItems.data
    .filter(item => item.price?.product)
    .map(item => ({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: (item.price!.product as Stripe.Product).metadata.id,
      },
      quantity: item.quantity || 0,
    }));

  return backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent as string,
    customerName,
    email: customerEmail,
    clerkUserId,
    stripeCustomerId: session.customer as string,
    currency,
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status,
    orderDate: new Date().toISOString(),
    address: parsedAddress
      ? {
          name: parsedAddress.name,
          city: parsedAddress.city,
          state: parsedAddress.state,
          zip: parsedAddress.zip,
          address: parsedAddress.address,
        }
      : null,
    ...(invoice ? { invoice: { id: typeof invoice === "string" ? invoice : invoice.id } } : {})
  });
}

async function attachInvoiceToOrder(orderId: string, invoice: Stripe.Invoice) {
  try {
    await backendClient
      .patch(orderId)
      .set({
        invoice: {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        },
      })
      .commit();
    console.log("[Order] Successfully updated invoice details");
  } catch {
    console.error("[Order] Failed to update invoice details");
  }
}

async function updateOrderStatus(orderId: string, status: string) {
  try {
    await backendClient
      .patch(orderId)
      .set({ status })
      .commit();
    console.log(`[Order] Updated status to ${status}`);
  } catch {
    console.error("[Order] Failed to update status");
  }
}

type ProductEntry = {
  product: { _ref: string };
  quantity: number;
};

async function updateStockForOrder(orderId: string) {
  const order = await backendClient.getDocument(orderId);
  if (!order || !order.products) {
    console.warn("[Inventory] Invalid order data");
    return;
  }

  const stockUpdates = (order.products as ProductEntry[])
    .filter(p => p.product?._ref && p.quantity)
    .map(p => ({
      productId: p.product._ref,
      quantity: p.quantity,
    }));

  await updateStockLevels(stockUpdates);
}

async function updateStockLevels(stockUpdates: { productId: string; quantity: number }[]) {
  for (const { productId, quantity } of stockUpdates) {
    try {
      const product = await backendClient.getDocument(productId);
      if (!product || typeof product.stock !== "number") {
        console.warn("[Inventory] Invalid product data");
        continue;
      }

      const newStock = Math.max(product.stock - quantity, 0);
      await backendClient
        .patch(productId)
        .set({ stock: newStock })
        .commit();
    } catch {
      console.error("[Inventory] Failed to update stock");
    }
  }
}
