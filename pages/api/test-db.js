// pages/api/test-db.js
// import clientPromise from '../../utils/db';

// export default async function handler(req, res) {
//   try {
//     const client = await clientPromise;
//     await client.db().admin().ping();
//     res.status(200).json({ status: 'MongoDB connected!' });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }