"use server";

import stripe from "@/lib/stripe";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  address?: Address | null;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
  items: GroupedCartItems[] = [], // default empty array just in case
  metadata: Metadata
) {
  try {
    // 🔹 Check if customer already exists
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    const customerId = customers?.data?.length > 0 ? customers.data[0].id : "";

    // 🔹 Calculate subtotal (defensive: ensure numbers)
    const subtotal = (items || []).reduce((acc, item) => {
      const price = Number(item?.product?.price ?? 0); // ensure number
      const qty = Number(item?.quantity ?? 0); // ensure number
      return acc + price * qty;
    }, 0);

    // 🔹 Base line items (cart products)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = (items || []).map(
      (item) => ({
        price_data: {
          currency: "EUR",
          unit_amount: Math.round((Number(item?.product?.price ?? 0)) * 100),
          product_data: {
            name: item?.product?.name || "Unknown Product",
            description: item?.product?.description,
            metadata: { id: item?.product?._id },
            images:
              item?.product?.images && item?.product?.images?.length > 0
                ? [urlFor(item?.product?.images[0]).url()]
                : undefined,
          },
        },
        quantity: Number(item?.quantity ?? 0),
      })
    );

    // 🔹 Add shipping fee only if subtotal < 79€
    if (subtotal < 79) {
      lineItems.push({
        price_data: {
          currency: "EUR",
          unit_amount: 3 * 100, // 3 euros
          product_data: {
            name: "Shipping Cost",
            description: "Standard delivery fee",
          },
        },
        quantity: 1,
      });
    } else {
      console.log("✅ Free shipping applied (order ≥ 79€)");
    }

    // 🔹 Build session payload
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId!,
        address: JSON.stringify(metadata.address),
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${
        metadata.orderNumber
      }`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: lineItems,
    };

    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    // 🔹 Create the session
    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating Checkout Session", error);
    throw error;
  }
}
