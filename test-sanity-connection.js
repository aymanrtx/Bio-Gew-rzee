// ✅ Load environment variables from .env file
require('dotenv').config();

const { createClient } = require('@sanity/client');

// Check environment variables
console.log('Environment variables check:');
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('SANITY_API_TOKEN:', process.env.SANITY_API_TOKEN ? 'SET' : 'NOT SET');

if (
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_SANITY_DATASET ||
  !process.env.SANITY_API_TOKEN
) {
  console.error('❌ Missing required environment variables!');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-06',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function testConnection() {
  try {
    console.log('🔍 Testing Sanity connection...');

    // 🔄 Test read operation
    const products = await client.fetch('*[_type == "product"] | order(_createdAt desc)[0...5]');
    console.log('✅ Read test successful. Found products:', products.length);

    // 🧪 Test write operation (create a test document)
    const testDoc = await client.create({
      _type: 'order',
      orderNumber: 'TEST-' + Date.now(),
      stripeCheckoutSessionId: 'test-session',
      stripeCustomerId: 'test@example.com',
      clerkUserId: 'test-user-id',
      customerName: 'Test Customer',
      email: 'test@example.com',
      stripePaymentIntentId: 'test-payment-intent',
      products: [],
      totalPrice: 0,
      currency: 'USD',
      amountDiscount: 0,
      status: 'paid',
      orderDate: new Date().toISOString(),
    });

    console.log('✅ Write test successful. Created test order:', testDoc._id);

    // 🧹 Clean up - delete the test document
    await client.delete(testDoc._id);
    console.log('🧼 Cleanup successful. Deleted test order.');

    console.log('🎉 All tests passed! Sanity connection is working correctly.');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.message.includes('token')) {
      console.error('🔐 This might be a token permission issue. Make sure your SANITY_API_TOKEN has write permissions.');
    }
  }
}

testConnection();
