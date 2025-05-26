import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  const token = req.cookies.token;
//   console.log("🍪 Cookie:", req.cookies);
// console.log("🔑 Token:", req.cookies.token);


  if (!token) {
    return res.status(401).json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ user: null });
  }
}
