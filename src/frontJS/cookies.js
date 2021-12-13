const btn = document.querySelector('section');

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
    const button = e.target.closest('.ticket_block_choose_btn');
    const arr = JSON.parse(getCookieByID('flight_info'))
    for (let i = 0; i < arr.length; i++) {
        button.id = arr[i]['flight_id']
        const id = button.id;
        console.log(id);
        if (parseInt(id) === arr[i]['flight_id'] && !getCookieByID(`flight${id}`)) {
            console.log(id + 'set');
            setCookieByID(`flight${id}`, JSON.stringify([arr[i]]));
            break;
        } 
        else if (getCookieByID(`flight${id}`)) {
            console.log(id + 'delete');
            deleteCookie(`flight${id}`);
        }
    }
    });

