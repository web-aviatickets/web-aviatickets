async function buyTicket() {
  const id = 30;
  const response = await fetch('/bookTicket', {method: 'POST', body: id });
  flights = await response.json();
  window.location.pathname = '/tickets'
}

document.getElementById('card').addEventListener('click', buyTicket)
document.getElementById('book').addEventListener('click', buyTicket)
document.getElementById('qr_code').addEventListener('click', buyTicket)

