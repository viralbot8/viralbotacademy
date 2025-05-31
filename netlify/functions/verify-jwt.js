const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ valid: false, error: "Method Not Allowed" }),
    };
  }

  try {
    const { token } = JSON.parse(event.body);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true, decoded }),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false, error: err.message }),
    };
  }
};
