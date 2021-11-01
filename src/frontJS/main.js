document.addEventListener('DOMContentLoaded', () => {
  styleFooter();
  const logos = document.getElementsByClassName('logo');
  for (let logo of logos) {
    logo.addEventListener('click', () => window.location.href = '/src/main.html');
  }
});