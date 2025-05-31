const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const secret = process.env.JWT_SECRET || "HD9!sL@8F3^29qP*zvWs76!k"; // remove newline

  const { token } = JSON.parse(event.body || "{}");
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ valid: false, error: "Missing token" })
    };
  }

  try {
    const decoded = jwt.verify(token, secret);

    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true, decoded })
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false, error: "Invalid or expired token" })
    };
  }
};
