const loginStatus = localStorage.getItem('login');

if (loginStatus !== 'true') {
  // Redirect the user to the homepage
  window.location.href = '/locked';
}