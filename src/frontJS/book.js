const places = document.querySelector('.places_choose_board_cabin');

places.addEventListener('click', e => {
    e.preventDefault();
    const place = e.target.closest('.place');
    console.log(e);
    if (place.classList.contains('white')) place.classList.toggle('red');
});