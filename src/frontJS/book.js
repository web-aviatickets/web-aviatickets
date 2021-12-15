const places = document.querySelector('.places_choose_board_cabin');
const arr = [];

places.addEventListener('click', e => {
    e.preventDefault();
    const place = e.target.closest('.place');
    choise_place(place);
});

function choise_place(place) {
  arr.push(place);
  if (arr.length == 1) {
    if (place.classList.contains('white')) place.classList.toggle('red');
  }
  if (arr.length > 1) {
    for(let i = 0; i < arr.length - 1; i++) {
      if (arr[i].classList.contains('red')) arr[i].classList.toggle('red');
    }
    if (arr[arr.length-1].classList.contains('white')) {
      place.classList.toggle('red');
    }
  }
}