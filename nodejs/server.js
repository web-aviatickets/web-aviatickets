'use script';

const http = require('http');
const fs = require('fs');

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

class Server {
  _dbRequests = {
    //put here get requests to db
    //EXAMPLE: '/allBanks': (res) => this.getAllBanks(res),
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
    console.log(req.method, name);
    let data = '';
    req.on('error', (err) => console.error(err));

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', async () => {
      //add smth to db
    });
  }

  handleDeleteRequest(req, res) {
    let data = '';
    req.on('error', (err) => console.error(err));

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', async () => {
      //delete smth from db
    });
  }

}

module.exports = { Server };
