const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const secret = "HD9!sL@8F3^29qP*zvWs76!k"; // ✅ cleaned secret – no newline

  const authHeader = event.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

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
