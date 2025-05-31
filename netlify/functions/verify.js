const jwt = require('jsonwebtoken');

exports.handler = async function(event) {
  const { token } = event.queryStringParameters;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return {
      statusCode: 400,
      body: JSON.stringify({ valid: false }),
    };
  }

  try {
    const data = jwt.verify(token, secret);
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true, email: data.email }),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false }),
    };
  }
};
