const form = document.getElementById('form');
const href = document.getElementById('getFromDB');
const path = window.location.pathname;

const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

const setCookie = (name, value, options = {}) => {
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

    document.cookie = updatedCookie;

  }

const buildApi = (methods) => {
    const api = {};
    for (const method of methods) {
        api[method] = (...args) => new Promise((resolve, reject) => {
            const url = `http://localhost:8000${path}/${method}`
            fetch(url, {
                method: 'POST',
                headers : {'Content-Type': 'application/json'},
                body : args
              })
              .then(res => {
                  //console.log(res)
                  const { status } = res;
                  //console.log(status);
                  if (status !== 200) {
                      reject(new Error(`Status Code: ${status}`));
                  } else {
                      //console.log(res.json)
                      resolve(res.json());
                  }
              })
        })
    }
    return api;
}

const api = buildApi(['getFromDB', 'getById']);

const cookieForSeats = [];

form.addEventListener('submit', e => {
    e.preventDefault();
    const method = href.id;
    const pathTo = href.pathname;
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    api[method](json)
        .then(data => {
            console.log(data[0]);
            // if (data[])
            setCookie(`flight_info`, JSON.stringify([...data]));
            window.location.href = `${pathTo}`;
        })
});