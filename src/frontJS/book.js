const places = document.querySelector('.places_choose_board_cabin');
let prevPlace;
const choosedPlaces = document.querySelectorAll('.place');


places.addEventListener('click', e => {
    e.preventDefault();
    const place = e.target.closest('.place');
    choose_place(place);
});

const getCookies = (name) => {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const flightInfo = JSON.parse(getCookies('flight_info'));

const getAllSeats = (args) => {
       console.log(args);
     fetch('http://localhost:8000/book/getPlaces', {
                method: 'POST',
                headers : {'Content-Type': 'application/json'},
                body : args
              })
              .then(data => data.json())
              .then(data => {
                choosedPlaces.forEach((place, i) => {
                      const index = parseInt(place.textContent);
                      const { taken, seat_number, ticket_price } = data[index - 1];
                      place.title = ticket_price;
                      if (taken !== 0) {
                          place.classList.add('grey');
                      }
                  })
            });
}

flightInfo.forEach(({flight_id}) => {
    if (getCookies(`flight${parseInt(flight_id)}`)) {
        getAllSeats(JSON.stringify(flight_id));
    }
});

function choose_place(place) {
  if (typeof(prevPlace) != 'undefined'){
    if (prevPlace.classList.contains('red')) prevPlace.classList.toggle('red');
  }
  const currentPlace = place;
  if (currentPlace.classList.contains('white')) currentPlace.classList.toggle('red');
  prevPlace = currentPlace;
}