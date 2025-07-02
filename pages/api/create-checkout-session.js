import Stripe from 'stripe';
import { connectToDB } from '../../lib/mongodb';
import ShopOrder from '../../models/ShopOrder';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDB();
      const { cart, email, fname, lname, company, country, post_code, phone, note } = req.body;
      // Save order to MongoDB
      const order = new ShopOrder({ cart, email, fname, lname, company, country, post_code, phone, note });
      await order.save();
      // Stripe session creation
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
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
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