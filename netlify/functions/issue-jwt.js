const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const { email } = event.queryStringParameters;

  console.log("Email received:", email);
  console.log("Env secret:", process.env.JWT_SECRET);

  if (!email || !process.env.JWT_SECRET) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Missing email or secret." }),
    };
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};
