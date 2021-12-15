'use strict';

const dbLoginSettings = require('../config/dbLoginSettings.config.json');
const { Database } = require('./db/database.js');
const database = new Database(dbLoginSettings);

async function example () {
  await database.checkSchema();
  const con = await database.createConnection();
  con.connect( async (err) => {
    if (err) throw err;
    // get all free seats of many flights by params
    await database.anyQuery('SELECT * FROM tickets WHERE ticket_id > 400')
    .then(res => console.log(res))
    .catch(err => console.error(err));
    con.destroy();
  });
}

example();

// other examples of db queries usage
// await this.getFlightsByParams('Париж', 'Пекін', '2021-12-31');
// await this.getAllPlaces();
// await this.getFlightById(2);
// await this.getAllSeats(3);
// await this.bookTicket(22, 2);
// await this.getFreeSeats(2);
// await this.registrateCustomer({email: 'www@mail.com', 
//                                phoneNumber: '+4408747485', 
//                                country: 'Belgium', 
//                                gender: 'male', 
//                                dateOfBirth: '12-03-01', 
//                                document: 'passport', 
//                                citizenship: 'American',
//                                passportNumber: '34343',
//                                valid: '2025-10-5 14:59:59',
//                                name: 'John',
//                                surname: 'Snow',
//                                middleName: 'Snow' });
