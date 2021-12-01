'use script';

const http = require('http');
const fs = require('fs');
const dbLoginSettings = require('../config/dbLoginSettings.config.json');
const { Database } = require('./db/database.js');

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
}

// const receiveArgs = async (req) => {
//   const buffers = [];
//   for await (const chunk of req) buffers.push(chunk);
//   const data = Buffer.concat(buffers).toString();
//   return JSON.parse(data);
// };

// const httpError = (res, status, message) => {
//   res.statusCode = status;
//   res.end(`"${message}"`);
// };


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

  handleGetRequest(req, res) {
    let name = req.url;
    console.log(req.method, name);
    if (routing[name]) name = routing[name];
    if (this._dbRequests[name]) {
      this._dbRequests[name](res);
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
      // console.log('data', JSON.parse(chunk));
    });
  
    req.on('end', async () => {
      console.log('data', JSON.parse(data));
      if (name === '//getFromDB') {
        const con = await this.database.createConnection();
        con.connect( async (err) => {
          if (err) throw err;
          await this.database.getFlightsByParams('Париж', 'Пекін', '2021-12-31')
          .then(response => {
            res.writeHead(200, { 'Content-Type': `application/json; charset=utf-8` });
            res.write(JSON.stringify(response));
            console.log(JSON.stringify(response))
            res.end();
          })
          .catch(err => console.error(err));
          con.destroy();
        });
      }
      //add smth to db
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
