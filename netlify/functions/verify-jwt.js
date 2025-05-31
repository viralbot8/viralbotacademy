const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  const email = event.queryStringParameters.email;
  const secret = process.env.JWT_SECRET;

  if (!email || !secret) {
    return {
      statusCode: 400,
      body: 'Missing email or JWT secret',
    };
  }

  const token = jwt.sign(
    { email },
    secret,
    { expiresIn: '30d' }
  );

  const html = `
    <html>
      <body style="font-family: sans-serif; text-align: center; padding: 2em;">
        <h2>✅ Access Granted</h2>
        <p>We've generated your access token.</p>
        <script>
          localStorage.setItem('jwt', '${token}');
          setTimeout(() => {
            window.location.href = '/course/';
          }, 1500);
        </script>
        <p>Redirecting to your course...</p>
      </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: html,
  };
};
