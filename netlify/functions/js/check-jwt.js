(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  let token = localStorage.getItem("jwt");

  // If email param is present, request a new token
  if (email) {
    try {
      const response = await fetch(`/.netlify/functions/issue-jwt?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("jwt", data.token);

        // Clean up URL (remove ?email=...)
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        return; // skip verification this round
      } else {
        window.location.href = "/unauthorized.html";
      }
    } catch (err) {
      window.location.href = "/unauthorized.html";
    }
  }

  // If no token at all, or token is invalid, block access
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

    const result = await res.json();
    if (!result.valid) {
      localStorage.removeItem("jwt");
      window.location.href = "/unauthorized.html";
    }
  } catch (err) {
    console.error("JWT verify failed", err);
    localStorage.removeItem("jwt");
    window.location.href = "/unauthorized.html";
  }
})();
