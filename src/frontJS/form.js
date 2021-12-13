const {getCookie, setCookie} = required('./cookies.js');

const form = document.getElementById('form');
const href = document.getElementById('getFromDB');
const path = window.location.pathname;
// const mounths = document.querySelector('.mounth_container');
// const inpMounth = document.getElementById('input_mounth');
// const arrows = document.querySelector('.pasengers_data');

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
                  console.log(res)
                  const { status } = res;
                  console.log(status);
                  if (status !== 200) {
                      reject(new Error(`Status Code: ${status}`));
                  } else {
                      console.log(res.json)
                      resolve(res.json());
                  }
              })
        })
    }
    return api;
}

const api = buildApi(['getFromDB']);

form.addEventListener('submit', e => {
    e.preventDefault();
    const method = href.id;
    const pathTo = href.pathname;
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    api[method](json)
        .then(data => {
            data.forEach(({flight_date, flight_duration, flight_id, flight_name, from, to}) => {
                setCookie('flight_info', JSON.stringify([...data]));
                getCookie('flight_info');
            })
           window.location.href = `${pathTo}`;
        });
});