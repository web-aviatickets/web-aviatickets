await database.createNewFlight('Рейс номер 666', '2021-12-31', 'Пекін', 'Париж', '04:00:00', 2000, 500)
.then(res => console.log(res))
.catch(err => console.error(err));
await database.createNewFlight('Рейс номер 666-r', '2021-12-31', 'Париж', 'Пекін', '04:00:00', 2000, 500)
.then(res => console.log(res))
.catch(err => console.error(err));
await database.createNewFlight('Рейс номер 1A', '2021-12-31', 'Пекін', 'Париж', '03:00:00', 300, 400)
.then(res => console.log(res))
.catch(err => console.error(err));
await database.createNewFlight('Рейс номер 1B', '2021-12-31', 'Париж', 'Пекін', '03:00:00', 300, 400)
.then(res => console.log(res))
.catch(err => console.error(err));
await database.createNewFlight('Рейс номер 1B', '2021-12-31', 'Пекін', 'Париж', '03:00:00', 300, 400)
.then(res => console.log(res))
.catch(err => console.error(err));
await database.createNewFlight('Рейс номер 2A', '2022-01-01', 'Київ', 'Запоріжжя', '03:00:00', 55, 8000)
.then(res => console.log(res))
.catch(err => console.error(err));
await database.createNewFlight('Рейс номер 2B', '2022-01-01', 'Запоріжжя', 'Київ', '03:00:00', 55, 8000)
.then(res => console.log(res))
.catch(err => console.error(err));
await database.createNewFlight('Рейс номер 3А', '2022-01-01', 'Київ', 'Запоріжжя', '02:54:00', 800, 5555)
.then(res => console.log(res))
.catch(err => console.error(err));
await database.createNewFlight('Рейс номер 3B', '2022-01-01', 'Запоріжжя', 'Київ', '02:54:00', 800, 5555)
.then(res => console.log(res))
.catch(err => console.error(err));