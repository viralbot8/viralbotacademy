// /course/js/check-jwt.js
(async () => {
  const token = localStorage.getItem("jwt");
  if (!token) { location.href = "/unauthorized.html"; return; }

  try {
    const res  = await fetch("/.netlify/functions/verify-jwt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const out = await res.json();
    if (!out.valid) throw new Error(out.error);
  } catch (e) {
    localStorage.removeItem("jwt");
    location.href = "/unauthorized.html";
  }
})();
