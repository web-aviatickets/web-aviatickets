'use strict';

const mysql = require('mysql');

class Database {
  constructor(loginSettings) {
    this.loginSettings = loginSettings;
    this.con = null;
  }

  async createConnection() {
    this.con = await mysql.createConnection(this.loginSettings);
    return this.con;
  }

  execQueryPromise(query) {
    return new Promise((resolve, reject) => {
      this.con.query(query, (err, script) => {
        if (err) reject(err);
        else resolve(script);
      });
    });
  }

  async checkSchema() {
    const dbplaces = `
    CREATE TABLE IF NOT EXISTS places (
      place_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      place_name varchar(100)
    );`;
    const dbflights = `
    CREATE TABLE IF NOT EXISTS flights (
      flight_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      flight_name varchar(40),
      flight_date datetime,
      from_place int NOT NULL,
      where_place int NOT NULL,
      flight_duration time,
      CONSTRAINT fk_flights_on_places
      FOREIGN KEY (from_place)
      REFERENCES places(place_id),
      CONSTRAINT fk_flights_on_places2
      FOREIGN KEY (where_place)
      REFERENCES places(place_id)
    );`;
    const dbtickets = `
    CREATE TABLE IF NOT EXISTS tickets (
      ticket_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      flight_id int NOT NULL,
      seat_number int NOT NULL,
      ticket_price int unsigned,
      taken boolean,
      CONSTRAINT fk_tickets_on_flights
      FOREIGN KEY (flight_id)
      REFERENCES flights(flight_id)
    );
    `;
    const dbcustomers = `
    CREATE TABLE IF NOT EXISTS customers (
      customer_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email varchar(30),
      phone_number varchar(10),
      country varchar(20),
      gender varchar(6),
      day varchar(30),
      month varchar(30),
      year varchar(30),
      citizenship varchar(30),
      document varchar(30),
      passport_number int,
      valid datetime,
      surname varchar(30),
      name varchar(30),
      middle_name varchar(30)
    );`; 
    const dbbookedTickets = `
    CREATE TABLE IF NOT EXISTS booked_tickets (
      customer_id int,
      ticket_id int,
      CONSTRAINT fk_booked_tickets_on_customers
      FOREIGN KEY (customer_id)
      REFERENCES customers(customer_id),
      CONSTRAINT fk_booked_tickets_on_tickets
      FOREIGN KEY (ticket_id)
      REFERENCES tickets(ticket_id)
    );`;
    const dbschema = {'places': dbplaces, 'flights': dbflights, 'tickets': dbtickets, 'customers': dbcustomers, 'booked_tickets': dbbookedTickets};
    const con = await this.createConnection();
    con.connect( async (err) => {
      if (err) throw new Error(err);
      for (let schema in dbschema) {
        await this.execQueryPromise(dbschema[schema])
        .catch(err => console.error(err));
        await this.execQueryPromise(this.languageSupportQueryToTable(schema))
        .catch(err => console.error(err));
      }
      con.destroy();
    });
  }

  languageSupportQueryToTable(table) {
    return `ALTER TABLE ${table} CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci`;
  }

  async getAllPlaces() {
    let data = null;
    const query = `SELECT * FROM places`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async getFlightsByParams(from, to, date) {
    let data = null;
    const query = `SELECT flights.flight_id, flights.flight_name, flights.flight_date, p1.place_name "from", p2.place_name "to", flights.flight_duration
                   FROM flights 
                   INNER JOIN places p1
                   ON p1.place_id = flights.from_place
                   INNER JOIN places p2
                   ON p2.place_id = flights.where_place
                   WHERE p1.place_name = '${from}' AND
                         p2.place_name = '${to}' AND
                         DATE(flights.flight_date) = '${date}'`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async getFlightById(id) {
    let data = null;
    const query = `SELECT flights.flight_id, flights.flight_name, flights.flight_date, p1.place_name "from", p2.place_name "to", flights.flight_duration
                   FROM flights
                   INNER JOIN places p1
                   ON p1.place_id = flights.from_place
                   INNER JOIN places p2
                   ON p2.place_id = flights.where_place
                   WHERE flights.flight_id = '${id}'`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async getAllSeats(id) { //id of flight
    let data = null;
    const query = `SELECT tickets.* 
                   FROM tickets
                   WHERE tickets.flight_id = '${id}'`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async getFreeSeats(id) { //id of flight
    let data = null;
    const query = `SELECT tickets.* 
                   FROM tickets
                   WHERE tickets.flight_id = '${id}' AND
                         tickets.taken IS false`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async anyQuery(query) {
    let data = null;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async bookTicket(ticketId, customerId) {
    let data = null;
    let success = true;
    const query = `UPDATE tickets 
                   SET tickets.taken = true
                   WHERE tickets.ticket_id = '${ticketId}'`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => success = rows.affectedRows == 1);
    return data;
  }

  async registrateCustomer(customer) { //customer info in object
    let id = null;
    const query = `INSERT INTO customers(email, phone_number, country, gender, date_of_birth, citizenship, document, passport_number, valid, surname, name, middle_name)
                   VALUES('${customer.email}', '${customer.phoneNumber}', '${customer.country}', '${customer.gender}', '${customer.dateOfBirth}', '${customer.citizenship}', '${customer.document}', '${customer.passportNumber}', '${customer.valid}', '${customer.surname}', '${customer.name}', '${customer.middleName}')`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => id = rows.insertId);
    return id;
  }

  async getAllBookedTickets() {
    let data = null;
    const query = `SELECT booked_tickets.* 
                   FROM booked_tickets`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async createNewPlace(place) {
    let data = null;
    const query = `INSERT INTO places(place_name) VALUES('${place}')`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async createNewSeat(flightId, seatNumber, seatPrice) {
    let data = null;
    const query = `INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
                   VALUES(${flightId}, ${seatNumber}, false, ${seatPrice})`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async createNewFlight(flightName, flightDate, fromPlaceName, toPlaceName, flightDuration, defaultPrice1, defaultPrice2) {
    let data = null;
    const placeIds = [];
    let query = `SELECT *
                  FROM places
                  WHERE place_name = '${fromPlaceName}'`;
    let rows = await this.execQueryPromise(query).catch(err => console.error(err));
    if (rows.length <= 0) {
      await this.createNewPlace(fromPlaceName)
      .then(rows2 => rows = [{place_id: rows2.insertId}]);
    }
    placeIds.push(rows[0].place_id);
    query = `SELECT *
             FROM places
             WHERE place_name = '${toPlaceName}'`;
    rows = await this.execQueryPromise(query).catch(err => console.error(err));
    if (rows.length <= 0) {
      await this.createNewPlace(toPlaceName)
      .then(rows2 => rows = [{place_id: rows2.insertId}]);
    }
    placeIds.push(rows[0].place_id);
    query = `INSERT INTO flights(flight_name, flight_date, from_place, where_place, flight_duration)
             VALUES('${flightName}', '${flightDate}', '${placeIds[0]}', '${placeIds[1]}', '${flightDuration}')`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    if (data.affectedRows != 1) return data;
    const flightId = data.insertId;
    for (let i = 1; i <= 64; i++) {
      const price = i%2 === 0 ? defaultPrice2 : defaultPrice1;
      await this.createNewSeat(flightId, i, price).catch(err => console.error(err));
    }
    return data;
  }

  async updateFlight(flightName, flightDate, fromPlaceName, toPlaceName, flightDuration, flightId, lowerCost, higherCost) {
    let data = null;
    const placeIds = [];
    let query = `SELECT *
                  FROM places
                  WHERE place_name = '${fromPlaceName}'`;
    let rows = await this.execQueryPromise(query).catch(err => console.error(err));
    if (rows.length <= 0) {
      await this.createNewPlace(fromPlaceName)
      .then(rows2 => rows = [{place_id: rows2.insertId}]);
    }
    placeIds.push(rows[0].place_id);
    query = `SELECT *
             FROM places
             WHERE place_name = '${toPlaceName}'`;
    rows = await this.execQueryPromise(query).catch(err => console.error(err));
    if (rows.length <= 0) {
      await this.createNewPlace(toPlaceName)
      .then(rows2 => rows = [{place_id: rows2.insertId}]);
    }
    placeIds.push(rows[0].place_id);
    query = `UPDATE flights 
             SET flight_name='${flightName}',
             flight_duration='${flightDuration}',
             flight_date='${flightDate}',
             from_place='${placeIds[0]}',
             where_place='${placeIds[1]}'
             WHERE flight_id='${flightId}'`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    for (let i = 1; i <= 64; i++) {
      console.log(i, higherCost, lowerCost)
      const price = i%2 === 0? higherCost : lowerCost;
      await this.updateSeat(flightId, i, price).catch(err => console.error(err));
    }
    return data;
  }

  async updateSeat(flightId, seatNumber, seatPrice) {
    let data = null;
    const query = `UPDATE tickets
                    SET ticket_price = ${seatPrice}
                   WHERE flight_id = ${flightId} AND seat_number = ${seatNumber}`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);
    return data;
  }

  async deleteFlightById(id) {
    let data = null;
    const query0 = `SET FOREIGN_KEY_CHECKS = 0`;
    await this.execQueryPromise(query0)
    .catch(err => console.error(err));

    const query = `DELETE FROM flights WHERE flight_id='${id}'`;
    await this.execQueryPromise(query)
    .catch(err => console.error(err))
    .then(rows => data = rows);

    const query2 = `DELETE FROM tickets WHERE flight_id='${id}'`;
    await this.execQueryPromise(query2)
    .catch(err => console.error(err));

    const query3 = `SET FOREIGN_KEY_CHECKS = 1`;
    await this.execQueryPromise(query3)
    .catch(err => console.error(err));
    return data;
  }

}

module.exports = { Database };
