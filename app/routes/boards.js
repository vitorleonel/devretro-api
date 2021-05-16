'use strict';

const boardsController = require('../controllers/boards');
const boardsSocket = require('../sockets/boards');

const boards = (app, _, done) => {
  app.post('/', boardsController.createBoard);

  app.io.of(/boards-*/).on('connection', boardsSocket);

  done();
};

module.exports = boards;
