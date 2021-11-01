'use strict';

const { Server } = require('./nodejs/server.js');

const server = new Server(process.env.PORT || 8000);
