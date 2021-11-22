window.onload = function() {
  const form = document.getElementById('form');
const btn = document.getElementById('find-tickets');

document.addEventListener('DOMContentLoaded', () => {
  styleFooter();
  const logos = document.getElementsByClassName('logo');
  for (let logo of logos) {
    logo.addEventListener('click', () => window.location.href = '/');
  }
});

form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
    fetch('http://localhost:8000/', {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
      body : json
    })
      .finally(window.location.href = '/chooseTicket');
  });

}