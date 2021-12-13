const mounths = document.querySelector('.mounth_container');
const inpMounth = document.getElementById('input_mounth');
const arrows = document.querySelector('.pasengers_data');

arrows.addEventListener('click', e => {
    e.preventDefault();
    const arrow = e.target.closest('.arr');
    const nextArrow = arrow.nextElementSibling;
    const previousArrow = arrow.previousElementSibling;
    if (nextArrow) {
        nextArrow.classList.remove('hidden');
        arrow.classList.add('hidden');
    } else {
        previousArrow.classList.remove('hidden');
        arrow.classList.add('hidden');
    }
    mounths.classList.toggle('hidden');
});

mounths.addEventListener('click', e => {
    e.preventDefault();
    const mounth = e.target.closest('.mounth');
    const text = mounth.textContent;
    inpMounth.value = text;
    mounths.classList.add('hidden');
});