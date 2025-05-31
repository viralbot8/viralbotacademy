// /course/js/check-jwt.js
(async () => {
  const STORAGE_KEY = "jwt";
  const url      = new URL(location.href);
  const email    = url.searchParams.get("email");
  let   token    = localStorage.getItem(STORAGE_KEY);

  /* 1️⃣ No token yet but email param present → fetch a new one */
  if (!token && email) {
    try {
      const r   = await fetch(`/.netlify/functions/issue-jwt?email=${encodeURIComponent(email)}`);
      const out = await r.json();
      if (out.token) {
        token = out.token;
        localStorage.setItem(STORAGE_KEY, token);
        history.replaceState({}, "", url.pathname);           // clean ?email=
      }
    } catch (err) {
      console.error("issue-jwt failed:", err);
    }
  }

  /* 2️⃣ If still no token → bounce */
  if (!token) {
    location.href = "/unauthorized.html";
    return;
  }

  /* 3️⃣ Verify token with backend */
  try {
    const r   = await fetch("/.netlify/functions/verify-jwt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const out = await r.json();
    if (!out.valid) throw new Error(out.error);
  } catch (err) {
    console.warn("Token invalid:", err.message);
    localStorage.removeItem(STORAGE_KEY);
    location.href = "/unauthorized.html";
  }
})();
