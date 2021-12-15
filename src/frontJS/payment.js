async function buyTicket() {
  const nam = new RegExp(`(?<=flight=)[^;]*`)
  const cook = decodeURIComponent(document.cookie).match(nam)[0];
  console.log(cook);
  const id = cook.match(new RegExp('seat_number":"[0-9]*', 'g'))[0].split('"')[2];
  console.log(id);
  const fl = cook.match(new RegExp('flight_id":[0-9]*', 'g'))[0].split('":')[1];
  console.log(fl);
  await fetch('/bookTicket', {method: 'POST', body: JSON.stringify({id: id, fl: fl })});
  window.location.pathname = '/tickets'
}

document.getElementById('card').addEventListener('click', buyTicket)
document.getElementById('book').addEventListener('click', buyTicket)
document.getElementById('qr_code').addEventListener('click', buyTicket)

