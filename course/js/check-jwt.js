// /course/js/check-jwt.js
(async () => {
  const token = localStorage.getItem("jwt"); // fixed!

  if (!token) {
    window.location.href = "/unauthorized.html";
    return;
  }

  try {
    const res = await fetch("/.netlify/functions/verify-jwt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    if (!data.valid) throw new Error("Invalid token");
  } catch (err) {
    localStorage.removeItem("jwt");
    window.location.href = "/unauthorized.html";
  }
})();
