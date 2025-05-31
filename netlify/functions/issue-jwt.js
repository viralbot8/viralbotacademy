const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const secret = process.env.JWT_SECRET;
  const { email } = event.queryStringParameters;

  if (!email) {
    return {
      statusCode: 400,
      body: "Missing email",
    };
  }

  // Generate a token that expires in 30 days
  const token = jwt.sign({ email }, secret, { expiresIn: "30d" });

  const html = `
    <html>
      <head>
        <script>
          localStorage.setItem("token", "${token}");
          window.location.href = "/course/index.html";
        </script>
      </head>
      <body>
        Redirecting...
      </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
};
