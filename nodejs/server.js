'use script';

const http = require('http');
const fs = require('fs');
const dbLoginSettings = require('../config/dbLoginSettings.config.json');
const { Database } = require('./db/database.js');
const database = new Database(dbLoginSettings);


const mime = {
  'html': 'text/html',
  'js': 'text/javascript',
  'css': 'text/css',
  'png': 'image/png',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'json': 'text/plain',
  'txt': 'text/plain',
};

const routing = {
  '/':  '/src/main.html',
  '/chooseTicket':  '/src/choosing_ticket.html',
  '/contactInfo': '/src/contact_info.html',
  '/payment': '/src/payment.html',
  '/book': '/src/book.html',
  '/admin': '/src/admin.html',
  '/tickets': '/src/tickets.html'
}



const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};


class Server {
  _dbRequests = {
    //put here get requests to db
    //EXAMPLE: '/allBanks': (res) => this.getAllBanks(res),

    // 'getFromDB' : async (req, res) => {
    //   const con = await database.createConnection();
    //   con.connect( async (err) => {
    //     if (err) throw err;
    //     const args = await receiveArgs(req);
    //     try {
    //       const values = Object.values(args);
    //       const data = await database.getFlightsByParams(...values);
    //       if (!data) {
    //         httpError(res, 500, 'Server error');
    //         return;
    //       }
    //       con.destroy();
    //       res.end(JSON.stringify(data));
    //     } catch (err) {
    //       console.dir({ err });
    //       httpError(res, 500, 'Server error');
    //       con.end();
    //     }
    //   });
    // } 
  };

  _reqMethods = {
    'GET': (req, res) => this.handleGetRequest(req, res),
    'POST': (req, res) => this.handlePostRequest(req, res),
    'DELETE': (req, res) => this.handleDeleteRequest(req, res),
  }

  constructor(port) {
    this.server = http.createServer();
    this.server.listen(port, () => console.log(`Server listening on port ${port}...`));
    this.server.on('request', (req, res) => this.handleRequest(req, res));
    this.database = new Database(dbLoginSettings);
  }

  handleRequest(req, res) {
    const reqMethod = this._reqMethods[req.method];
    if (reqMethod) reqMethod(req, res);
  }

   async handleGetRequest(req, res) {
    let name = req.url;
    console.log(req.method, name);
    if (routing[name]) name = routing[name];
    if (this._dbRequests[name]) {
      this._dbRequests[name](res);
      return;
    }
    if (name === '/getAllFlights') {
      const con = await this.database.createConnection();
      con.connect( async (err) => {
        if (err) throw err;
        await this.database.anyQuery(`SELECT f.flight_name, f.flight_id, f.flight_duration, f.flight_date, p.place_name AS "from", p1.place_name AS "to", t.ticket_price AS "lower", t1.ticket_price AS "higher"
                                      FROM flights f
                                      INNER JOIN places p 
                                      ON p.place_id = f.from_place
                                      INNER JOIN places p1
                                      ON p1.place_id = f.where_place
                                      INNER JOIN tickets t
                                      ON f.flight_id = t.flight_id
                                      INNER JOIN tickets t1
                                      ON f.flight_id = t1.flight_id
                                      WHERE t.seat_number = 1 AND t1.seat_number = 56`)
        .then(response => {
          res.writeHead(200, { 'Content-Type': `application/json; charset=utf-8` });
          res.write(JSON.stringify(response));
          res.end();
        })
        .catch(err => console.error(err));
        con.destroy();
      });
      return;
    }
    const extention = name.split('.')[1];
    const typeAns = mime[extention];
    fs.readFile('.' + name, (err, data) => {
      if (err) console.error('in handle request ' + err);
      else {
        res.writeHead(200, { 'Content-Type': `${typeAns}; charset=utf-8` });
        res.write(data);
      };
      res.end();
    });
  }

  handlePostRequest(req, res) {
    let name = req.url;
    // const [first, second] = name.substring(1).split('/');
    // console.log(name.substring(1).split('/'));
    console.log(req.method, name);
    let data = '';
    req.on('error', (err) => console.error(err));
    // this._dbRequests[second](req, res);
    req.on('data', chunk => {
      data += chunk;
    });
  
    req.on('end', async () => {
      if (name === '//getFromDB' || name === '/chooseTicket/getFromDB') {
        const arr = [];
        const con = await this.database.createConnection();
        con.connect( async (err) => {
          if (err) throw err;
          try {
            const args = JSON.parse(data);
            console.log(args);
            const values = Object.values(args);
            console.log(values);
            const newData = await this.database.getFlightsByParams(...values);
            for (const index in newData) {
              const id = newData[index]['flight_id'];
              const seats = await this.database.getAllSeats(id);
              const price = seats[0]['ticket_price'];
              newData[index]['ticket_price'] = price;
            }
            
            if (!newData) {
              httpError(res, 500, 'Server error');
              return;
            }
            con.destroy();
            res.end(JSON.stringify(newData));
          } catch (err) {
            console.dir({ err });
            httpError(res, 500, 'Server error');
            con.end();
          }
        });
      } else if (name === '/createFlight') {
        const reg = new RegExp('name="[a-zA-Z]*"[\r\n]+.*', 'g');
        const params = data.match(reg);
        const vars = {};
        for (const param of params) {
          const arr = param.split('"');
          vars[arr[1]] = arr[2].replace(/[\r\n]+/g,'');
        }
        const con = await this.database.createConnection();
        con.connect( async (err) => {
          if (err) throw err;
          await this.database.createNewFlight(vars.flightName, vars.datetime, vars.from, vars.to, vars.duration, vars.lowerCost, vars.higherCost)
          .then(response => {
            console.log(response);
            res.writeHead(200, { 'Content-Type': `application/json; charset=utf-8` });
            res.write(JSON.stringify(response));
            res.end();
          })
          .catch(err => console.error(err));
          con.destroy();
        });
      } else if (name === '/updateFlight') {
        const reg = new RegExp('name="[a-zA-Z]*"[\r\n]+.*', 'g');
        const params = data.match(reg);
        const vars = {};
        for (const param of params) {
          const arr = param.split('"');
          vars[arr[1]] = arr[2].replace(/[\r\n]+/g,'');
        }
        const con = await this.database.createConnection();
        con.connect( async (err) => {
          if (err) throw err;
          await this.database.updateFlight(vars.flightName, vars.datetime, vars.from, vars.to, vars.duration, vars.flightId, vars.lowerCost, vars.higherCost)
          .then(response => {
            console.log(response);
            res.writeHead(200, { 'Content-Type': `application/json; charset=utf-8` });
            res.write(JSON.stringify(response));
            res.end();
          })
          .catch(err => console.error(err));
          con.destroy();
        });
      } else if (name === '/deleteFlightById') {
        const id = JSON.parse(data);
        console.log(id);
        const con = await this.database.createConnection();
        con.connect( async (err) => {
          if (err) throw err;
          await this.database.deleteFlightById(id)
          .then(response => {
            res.writeHead(200, { 'Content-Type': `application/json; charset=utf-8` });
            res.write(JSON.stringify(response));
            res.end();
          })
          .catch(err => console.error(err));
          con.destroy();
        });
      } else if (name === '/bookTicket') {
        const id = JSON.parse(data);
        console.log(id);
        const con = await this.database.createConnection();
        con.connect( async (err) => {
          if (err) throw err;
          await this.database.bookTicket(id, 1)
          .then(response => {
            res.writeHead(200, { 'Content-Type': `application/json; charset=utf-8` });
            res.write(JSON.stringify(response));
            res.end();
          })
          .catch(err => console.error(err));
          con.destroy();
        });
      }
    });
  }

  handleDeleteRequest(req, res) {
    let data = '';
    req.on('error', (err) => console.error(err));

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      //delete smth from db
    });
  }

}

module.exports = { Server };
