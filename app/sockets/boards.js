'use strict';

const mockData = {
  name: 'My retro name',
  columns: [
    {
      id: 1,
      name: 'Went well',
      items: [
        {
          id: 1,
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
      ],
    },
    { id: 2, name: 'To improve', items: [] },
    { id: 3, name: 'Action items', items: [] },
  ],
};

const Board = require('../models/Board');

const boards = async (socket) => {
  const { boardId } = socket.handshake.query;
  const board = await Board.findById(boardId);

  if (!board) {
    return;
  }

  const columns = [];

  socket.emit('connection', { ...board.toObject(), columns });
};

module.exports = boards;
