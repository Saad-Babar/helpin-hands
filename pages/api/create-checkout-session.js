import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your test secret key

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cart } = req.body;
      if (!Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ success: false, error: 'Cart is required and must be a non-empty array.' });
      }
      const line_items = cart.map(item => ({
        price_data: {
          currency: 'pkr', // or 'usd', 'inr', etc.
          product_data: { name: item.productName || item.title },
          unit_amount: Math.round(Number(item.price) * 100), // Stripe expects amount in cents/paise
        },
        quantity: item.qty || item.quantity || 1,
      }));
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: '/success',
        cancel_url: '/cancel',
      });
      res.status(200).json({ success: true, sessionId: session.id, url: session.url });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message || 'Failed to create checkout session' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}