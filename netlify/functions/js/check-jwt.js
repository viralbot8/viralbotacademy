// /course/js/check-jwt.js
(async () => {
  const token = localStorage.getItem("jwt");

  // Try to issue a new token if we have an email in the URL
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  if (!token && email) {
    try {
      const res = await fetch(`/.netlify/functions/issue-jwt?email=${email}`);
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("jwt", data.token);

        // Remove ?email= from URL without reloading
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (err) {
      console.error("Token issue failed", err);
    }
  }

  // Verify the JWT via Netlify
  const finalToken = localStorage.getItem("jwt");
  if (finalToken) {
    try {
      const verify = await fetch("/.netlify/functions/verify-jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: finalToken }),
      });

      const result = await verify.json();
      if (!result.valid) throw new Error("Invalid");
    } catch (err) {
      localStorage.removeItem("jwt");
      window.location.href = "/unauthorized.html";
    }
  } else {
    window.location.href = "/unauthorized.html";
  }
})();
