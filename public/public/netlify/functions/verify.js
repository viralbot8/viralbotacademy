import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  const { license_key } = JSON.parse(req.body || '{}');

  const gumroadRes = await fetch('https://api.gumroad.com/v2/licenses/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_id: process.env.GUMROAD_PRODUCT_ID,
      license_key,
      increment_uses_count: true
    })
  }).then(r => r.json());

  if (!gumroadRes.success || gumroadRes.purchase.refunded) {
    return res.status(302).setHeader('Location', '/').end();
  }

  const token = jwt.sign(
    { key: license_key, time: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );

  res.setHeader('Set-Cookie', `auth=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=43200`);
  res.status(302).setHeader('Location', '/course').end();
};
