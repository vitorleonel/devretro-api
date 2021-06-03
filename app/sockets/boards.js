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

const addCard = async (boardId, payload, socket) => {
  let error = false;

  try {
    const { columnId, userId, description } = payload;

    if (!columnId || !userId || !description) {
      throw new Error('Bad request');
    }

    await BoardColumn.updateOne(
      { _id: columnId, board: boardId },
      { $push: { items: { userId, description } } }
    );

    await dispatchCurrentBoard(boardId, socket, true);
  } catch (error) {
    error = true;
  }

  socket.emit('cards-add', { error });
};

const removeCard = async (boardId, payload, socket) => {
  let error = false;

  try {
    const { columnId, userId, cardId } = payload;

    await BoardColumn.updateOne(
      { _id: columnId, board: boardId },
      { $pull: { items: { _id: cardId, userId } } }
    );

    await dispatchCurrentBoard(boardId, socket, true);
  } catch (error) {
    error = true;
  }

  socket.emit('cards-remove', { error });
};

const boards = async (socket) => {
  const { boardId } = socket.handshake.query;

  await dispatchCurrentBoard(boardId, socket);

  socket.on('cards-add', (playload) => addCard(boardId, playload, socket));
  socket.on('cards-remove', (payload) => removeCard(boardId, payload, socket));
};

module.exports = boards;
