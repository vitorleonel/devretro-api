'use strict';

const Board = require('../models/Board');
const BoardColumn = require('../models/BoardColumn');

const dispatchCurrentBoard = async (boardId, socket, broadcast = false) => {
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

    await dispatchCurrentBoard(boardId, socket, true);
  } catch (error) {
    error = true;

    // TODO: trigger logs
  }

  socket.emit('cards-add', { error });
};

const removeCard = async (boardId, columnId, cardId, socket) => {
  let error = false;

  try {
    await BoardColumn.updateOne(
      { _id: columnId, board: boardId },
      { $pull: { items: { _id: cardId } } }
    );

    await dispatchCurrentBoard(boardId, socket, true);
  } catch (error) {
    error = true;

    // TODO: trigger logs
  }

  socket.emit('cards-remove', { error });
};

const boards = async (socket) => {
  const { boardId } = socket.handshake.query;

  await dispatchCurrentBoard(boardId, socket);

  socket.on('cards-add', ({ columnId, description }) =>
    addCard(boardId, columnId, description, socket)
  );

  socket.on('cards-remove', ({ columnId, cardId }) =>
    removeCard(boardId, columnId, cardId, socket)
  );
};

module.exports = boards;
