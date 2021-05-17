'use strict';

const Board = require('../models/Board');
const BoardColumn = require('../models/BoardColumn');

const boards = async (socket) => {
  const { boardId } = socket.handshake.query;
  const board = await Board.findById(boardId);

  if (!board) {
    return;
  }

  const boardObject = board.toObject();
  const columns = await BoardColumn.find({ board: board._id });

  socket.emit('connection', {
    ...boardObject,
    columns,
  });
};

module.exports = boards;
