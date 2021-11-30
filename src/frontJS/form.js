const form = document.getElementById('form');
const href = document.getElementById('getFromDB');
const path = window.location.pathname;

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
                  const { status } = res;
                  if (status !== 200) {
                      reject(new Error(`Status Code: ${stauts}`));
                  } else {
                      resolve(res.json());
                  }
              })
        })
    }
    return api;
}

const api = buildApi(['getFromDB']);
console.log(href.pathname);
form.addEventListener('submit', e => {
    e.preventDefault();
    const method = href.id;
    const pathTo = href.pathname;
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    api[method](json)
        .then(data => console.log(data))
        .then(window.location.href = `${pathTo}`);
});