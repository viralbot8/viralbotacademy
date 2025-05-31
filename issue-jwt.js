const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const secret = "HD9!sL@8F3^29qP*zvWs76!k
"; // 🔒 Change this to your real secret
  const expiresIn = "7d"; // Token lasts 7 days

  const payload = {
    access: "granted",
    timestamp: Date.now()
  };

  const token = jwt.sign(payload, secret, { expiresIn });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  };
};
