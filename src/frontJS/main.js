document.addEventListener('DOMContentLoaded', () => {
  styleFooter();
  const logos = document.getElementsByClassName('logo');
  for (let logo of logos) {
    logo.addEventListener('click', () => window.location.href = '/');
  }
});

function goToChoosingTicket() {
  window.location.href = '/chooseTicket';
}
