import { verify } from 'jsonwebtoken';

export default async (req, context) => {
  const { pathname } = new URL(req.url);
  if (!pathname.startsWith('/course')) return;

  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/auth=([^;]+)/);
  if (!match) return Response.redirect('/', 302);

  try {
    verify(match[1], context.env.JWT_SECRET);
    return;
  } catch {
    return Response.redirect('/', 302);
  }
};
