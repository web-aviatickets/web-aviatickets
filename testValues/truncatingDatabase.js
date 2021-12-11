await database.anyQuery('SET FOREIGN_KEY_CHECKS = 0')
.then(res => console.log(res))
.catch(err => console.error(err));
await database.anyQuery('TRUNCATE TABLE booked_tickets')
.then(res => console.log(res))
.catch(err => console.error(err));
await database.anyQuery('TRUNCATE TABLE customers')
.then(res => console.log(res))
.catch(err => console.error(err));
await database.anyQuery('TRUNCATE TABLE flights')
.then(res => console.log(res))
.catch(err => console.error(err));
await database.anyQuery('TRUNCATE TABLE places')
.then(res => console.log(res))
.catch(err => console.error(err));
await database.anyQuery('TRUNCATE TABLE tickets')
.then(res => console.log(res))
.catch(err => console.error(err));
await database.anyQuery('SET FOREIGN_KEY_CHECKS = 1')
.then(res => console.log(res))
.catch(err => console.error(err));