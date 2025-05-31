/*  netlify/functions/issue-jwt.js  */
const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const secret = process.env.JWT_SECRET;
   // make sure you set JWT_SECRET in Netlify
  const email  = event.queryStringParameters.email;

  if (!email) {
    return { statusCode: 400, body: "Missing email" };
  }

  const token = jwt.sign({ email }, secret, { expiresIn: "30d" });

  /* ---------- 1️⃣  If the caller wants JSON (fetch from check-jwt.js) ---------- */
  const wantJson =
    (event.headers.accept || "").includes("application/json") ||
    event.headers["content-type"] === "application/json";

  if (wantJson) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    };
  }

  /* ---------- 2️⃣  Fallback: direct browser hit (rare) ---------- */
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `
      <html><body style="font-family:sans-serif;text-align:center;padding:2rem">
        <h2>✅ Token issued</h2>
        <script>
          localStorage.setItem("jwt","${token}");
          location.href = "/course/index.html";
        </script>
        Redirecting…
      </body></html>
    `,
  };
};
