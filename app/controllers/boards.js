'use strict';

module.exports.createBoard = (req, reply) =>
  reply.code(201).send({ id: Math.random(), name: req.body.name });
