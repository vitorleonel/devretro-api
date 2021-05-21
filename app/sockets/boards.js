'use strict';

const Board = require('../models/Board');
const BoardColumn = require('../models/BoardColumn');

const getCurrentBoard = async (boardId, socket, broadcast = false) => {
  try {
    const board = await Board.findById(boardId);

    if (!board) {
      throw new Error(`Board ${boardId} not found.`);
    }

    const boardObject = board.toObject();
    const columns = await BoardColumn.find({ board: board._id });

    const response = {
      ...boardObject,
      columns,
    };

    socket.emit('current-board', response);
    broadcast && socket.broadcast.emit('current-board', response);
  } catch (error) {
    // TODO: trigger logs
  }
};

const addCard = async (boardId, columnId, description, socket) => {
  let error = false;

  try {
    await BoardColumn.updateOne(
      { _id: columnId, board: boardId },
      { $push: { items: { description: description.trim() } } }
    );

    await getCurrentBoard(boardId, socket, true);
  } catch (error) {
    error = true;

    // TODO: trigger logs
  }

  socket.emit('cards-add', { error });
};

const boards = async (socket) => {
  const { boardId } = socket.handshake.query;

  await getCurrentBoard(boardId, socket);

  socket.on('cards-add', ({ columnId, description }) =>
    addCard(boardId, columnId, description, socket)
  );
};

module.exports = boards;
