(function () {
  const token = localStorage.getItem('course_jwt');
  if (!token) {
    window.location.href = "/unauthorized.html"; // redirect if not found
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      localStorage.removeItem('course_jwt');
      window.location.href = "/unauthorized.html"; // redirect if expired
    }
  } catch (err) {
    localStorage.removeItem('course_jwt');
    window.location.href = "/unauthorized.html"; // redirect if invalid
  }
})();
