function styleFooter() {
  const footer = document.querySelector('footer');
  footer.innerHTML = `
  <div class="footer-refs-container">
    <div class="logo-container">
      <div class="logo"><img src="../img/logo/logo.svg" alt="logo"></div>
      <p>&#169 aviatickets.ua 2010-2021</p>
    </div>
    <div class="info-container">
      <a>Поширені запитання</a>
      <a>Умови користування</a>
      <a>Про нас</a>
    </div>
    <div class="references-container">
      <div class="social-networks">
        <a href="https://www.instagram.com/"><img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" /></a>
        <a href="https://web.telegram.org/k/"><img src="https://img.icons8.com/color/48/000000/telegram-app--v5.png" /></a>
        <a href="https://www.youtube.com/"><img src="https://img.icons8.com/color/48/000000/youtube-play.png" /></a>
        <a href="https://uk-ua.facebook.com/"><img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" /></a>
      </div>
      <p>(044) 111-11-11
      <br>
      support@aviatickets.ua</p>
    </div>
  </div>
  <hr>
  <h2>Авіаквитки на AVIATICKETS&trade;</h2>
  <p>Якщо вам необхідно полетіти на близьку чи далеку відстань,
  то AVIATICKETS™ — сервіс для покупки авіаквитків — те що треба.
  Без поїздки до кас. Без очікування в чергах.
  </p>
  <p>Просто. Швидко. Доступно.</p>
  <a>Читати повністю&darr;</a>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  styleFooter();
});