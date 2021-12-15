const places = document.querySelector('.places_choose_board_cabin');
let prevPlace;
const choosedPlaces = document.querySelectorAll('.place');


places.addEventListener('click', e => {
    e.preventDefault();
    const place = e.target.closest('.place');
    choose_place(place);
});

const setCookies = (name, value, options = {}) => {
  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };
  
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  // console.dir(updatedCookie);
  document.cookie = updatedCookie;

}

const getCookies = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const deleteCookies = (name) => {
  setCookie(name, "", {
      'max-age': -1
  })
}

const flightInfo = JSON.parse(getCookies('flight'));

const getAllSeats = (args) => {
       console.log(args);
     fetch('http://localhost:8000/book/getPlaces', {
                method: 'POST',
                headers : {'Content-Type': 'application/json'},
                body : args
              })
              .then(data => data.json())
              .then(data => {
                console.log(data);
                choosedPlaces.forEach((place, i) => {
                      const index = parseInt(place.textContent);
                      const { taken, seat_number, ticket_price } = data[index - 1];
                      place.title = ticket_price;
                      if (taken == 1) {
                          place.classList.add('grey');
                      }
                  })
            });
}

getAllSeats(JSON.stringify(flightInfo[0]['flight_id']))


function choose_place(place) {
  if (typeof(prevPlace) != 'undefined'){
    if (prevPlace.classList.contains('red')) prevPlace.classList.toggle('red');
  }
  const currentPlace = place;
  if (currentPlace.classList.contains('white') && !currentPlace.classList.contains('grey')) { 
    currentPlace.classList.toggle('red');
    flightInfo[0]['seat_number'] = place.textContent;
    flightInfo[0]['ticket_price'] = place.title;
    setCookies(`flight`, JSON.stringify(flightInfo));
  }
  prevPlace = currentPlace;
}

const nam = new RegExp(`(?<=flight=)[^;]*`)
  const cook = decodeURIComponent(document.cookie).match(nam)[0];
  document.getElementById('flight_name').innerText = cook.match(new RegExp('flight_name":"[а-яА-Я 0-9a-zA-ZіїІЇ]*', 'g'))[0].split('"')[2];
  document.getElementById('from-city').innerText = cook.match(new RegExp('from":"[а-яА-Я a-zA-ZіїІЇ]*', 'g'))[0].split('"')[2];
  document.getElementById('to-city').innerText = cook.match(new RegExp('to":"[а-яА-Я 0-9a-zA-ZіїІЇ]*', 'g'))[0].split('"')[2];
  document.getElementById('departure').innerText = cook.match(new RegExp('flight_date":"[а-яА-Я 0-9a-zA-ZіїІЇ:-]*', 'g'))[0].split('"')[2].split('T')[1];
  document.getElementById('dep-date').innerText = cook.match(new RegExp('flight_date":"[а-яА-Я 0-9a-zA-ZіїІЇ:-]*', 'g'))[0].split('"')[2].split('T')[0];
