import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51RbMM8D5OKfTLSSqSigBTAgQ82YgfD5ASwzATqXFOqLNg6CNrQyGeJyFSbYkjfRPobVUKlzev152g7CLsOLdO1vE00l1Vh8PVw'); // Replace with your test secret key

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cart } = req.body;
    const line_items = cart.map(item => ({
      price_data: {
        currency: 'pkr', // or 'usd', 'inr', etc.
        product_data: { name: item.productName || item.title },
        unit_amount: Math.round(Number(item.price) * 100), // Stripe expects amount in cents/paise
      },
      quantity: item.qty || 1,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: '/success',
      cancel_url: '/cancel',
    });
    res.status(200).json({ sessionId: session.id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}