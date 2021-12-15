
document.addEventListener('DOMContentLoaded', () => {
  const nam = new RegExp(`(?<=flight=)[^;]*`)
  const cook = decodeURIComponent(document.cookie).match(nam)[0];
  const nam1 = new RegExp(`(?<=user=)[^;]*`)
  const cook1 = decodeURIComponent(document.cookie).match(nam1)[0];
  document.getElementById('flight_name').innerText = cook.match(new RegExp('flight_name":"[а-яА-Я 0-9a-zA-ZіїІЇ]*', 'g'))[0].split('"')[2];
  document.getElementById('from-city').innerText = cook.match(new RegExp('from":"[а-яА-Я a-zA-ZіїІЇ]*', 'g'))[0].split('"')[2];
  document.getElementById('to-city').innerText = cook.match(new RegExp('to":"[а-яА-Я 0-9a-zA-ZіїІЇ]*', 'g'))[0].split('"')[2];
  document.getElementById('departure').innerText = cook.match(new RegExp('flight_date":"[а-яА-Я 0-9a-zA-ZіїІЇ:-]*', 'g'))[0].split('"')[2].split('T')[1];
  document.getElementById('dep-date').innerText = cook.match(new RegExp('flight_date":"[а-яА-Я 0-9a-zA-ZіїІЇ:-]*', 'g'))[0].split('"')[2].split('T')[0];
  document.getElementById('ticket_price').innerText = cook.match(new RegExp('ticket_price":"[0-9]*', 'g'))[0].split('"')[2];
  document.getElementById('seat_number').innerText = cook.match(new RegExp('seat_number":"[0-9]*', 'g'))[0].split('"')[2];
  const dur = cook.match(new RegExp('flight_duration":"[а-яА-Я 0-9a-zA-ZіїІЇ:-]*', 'g'))[0].split('"')[2];
  document.getElementById('duration').innerText = `${dur.split(':')[0]} год ${dur.split(':')[1]} хв`;
  document.getElementById('name').innerText = cook1.match(new RegExp('"name":"[а-яА-Я 0-9a-zA-ZіїІЇ:-]*', 'g'))[0].split('"')[3];
  document.getElementById('surname').innerText = cook1.match(new RegExp('surname":"[а-яА-Я 0-9a-zA-ZіїІЇ:-]*', 'g'))[0].split('"')[2];
  document.getElementById('email').innerText = cook1.match(new RegExp('email":"[а-яА-Я 0-9a-zA-ZіїІЇ:-@.]*', 'g'))[0].split('"')[2];
  document.getElementById('phonenumber').innerText = cook1.match(new RegExp('tel":"[а-яА-Я 0-9a-zA-ZіїІЇ:-]*', 'g'))[0].split('"')[2];
  document.getElementById('phonenumber').innerText = cook1.match(new RegExp('tel":"[а-яА-Я 0-9a-zA-ZіїІЇ:-]*', 'g'))[0].split('"')[2];
})