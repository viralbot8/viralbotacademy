// netlify/functions/verify-jwt.js
const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const secret = process.env.JWT_SECRET || "dev-secret";

  try {
    const { token } = JSON.parse(event.body);
    jwt.verify(token, secret);
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true }),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false, error: err.message }),
    };
  }
};
