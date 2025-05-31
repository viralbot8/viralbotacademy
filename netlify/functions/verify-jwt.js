const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const { token } = JSON.parse(event.body || "{}");

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ valid: false, error: "Missing token" }),
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true, email: decoded.email }),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false, error: "Invalid or expired token" }),
    };
  }
};
