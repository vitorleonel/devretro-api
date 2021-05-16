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

const boards = (socket) => {
  console.log(socket.id);
  socket.emit('connection', mockData);
};

module.exports = boards;
