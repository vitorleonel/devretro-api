'use strict';

const Board = require('../models/Board');
const BoardColumn = require('../models/BoardColumn');

module.exports.createBoard = async (req, reply) => {
  try {
    const board = await Board.create({ name: req.body.name });

    await BoardColumn.insertMany([
      { board: board._id, name: 'Went well' },
      { board: board._id, name: 'To improve' },
      { board: board._id, name: 'Action items' },
    ]);

    reply.code(201).send({ board });
  } catch (error) {
    reply.code(500).send({ error: 'Error occurred. Try again.' });
  }
};
