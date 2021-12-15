const places = document.querySelector('.places_choose_board_cabin');
let prevPlace;

places.addEventListener('click', e => {
    e.preventDefault();
    const place = e.target.closest('.place');
    choose_place(place);
});

function choose_place(place) {
  if (typeof(prevPlace) != 'undefined'){
    if (prevPlace.classList.contains('red')) prevPlace.classList.toggle('red');
  }
  const currentPlace = place;
  if (currentPlace.classList.contains('white')) currentPlace.classList.toggle('red');
  prevPlace = currentPlace;
}