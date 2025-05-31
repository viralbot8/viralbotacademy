const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const email  = event.queryStringParameters.email;
  const secret = process.env.JWT_SECRET;

  if (!email || !secret) {
    return { statusCode: 400, body: "Missing email or secret" };
  }

  const token = jwt.sign({ email }, secret, { expiresIn: "30d" });

  /* ⚡ Instead of JSON we return a self-executing HTML snippet */
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `
      <!doctype html><html><head><meta charset="utf-8">
        <title>Redirect…</title>
        <script>
          localStorage.setItem("jwt", "${token}");
          location.replace("/course/index.html");
        </script>
      </head><body>Redirecting…</body></html>`
  };
};
