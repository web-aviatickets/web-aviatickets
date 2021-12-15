const btn = document.querySelector('section');
//const btn = document.querySelector('.ticket_block_choose');

const setCookieByID = (name, value, options = {}) => {
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

const getCookieByID = (name) => {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const deleteCookie = (name) => {
    setCookie(name, "", {
        'max-age': -1
    })
  }

  btn.addEventListener('click', e => {
    const button = e.target;
    const id = parseInt(button.id);
    let count = [];
    const arr = JSON.parse(getCookieByID('flight_info'));
    arr.forEach(({flight_id}, index) => {
      const flightId = arr[index]['flight_id'];
      if (id === flightId) {
        count = arr[index];
      } 
      setCookieByID(`flight`, JSON.stringify([count]));
    });
  });