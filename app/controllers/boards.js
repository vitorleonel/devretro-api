'use strict';

const Board = require('../models/Board');

module.exports.createBoard = async (req, reply) => {
  try {
    const board = await Board.create({ name: req.body.name });

    reply.code(201).send({ board });
  } catch (error) {
    reply.code(500).send({ error: 'Error occurred. Try again.' });
  }
};
