const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const { email } = event.queryStringParameters;

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing email" }),
    };
  }

  const token = jwt.sign(
    { email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, // Expires in 24 hours
    process.env.JWT_SECRET
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  };
};
