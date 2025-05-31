(function () {
  const tokenData = localStorage.getItem("access_token");

  if (!tokenData) {
    window.location.href = "https://gum.co/your-product-id"; // replace with your real product link
    return;
  }

  const token = JSON.parse(tokenData);
  const now = Date.now();

  if (now > token.expiry) {
    localStorage.removeItem("access_token");
    alert("Session expired. Please purchase again.");
    window.location.href = "https://gum.co/your-product-id"; // again replace
  }
})();
