(async () => {
  const STORAGE_KEY = "jwt";
  const url = new URL(location.href);
  const tokenFromUrl = url.searchParams.get("token");
  let token = tokenFromUrl || localStorage.getItem(STORAGE_KEY);

  // Save token if it came from URL
  if (tokenFromUrl) {
    localStorage.setItem(STORAGE_KEY, tokenFromUrl);
    history.replaceState({}, "", url.pathname); // Clean URL
  }

  // Redirect if no token
  if (!token) {
    window.location.href = "/unauthorized.html";
    return;
  }

  // Verify token with backend
  try {
    const res = await fetch("/.netlify/functions/verify-jwt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });

    const out = await res.json();
    if (!out.valid) throw new Error(out.error);
  } catch (err) {
    console.error("JWT check failed:", err.message);
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = "/unauthorized.html";
  }
})();
