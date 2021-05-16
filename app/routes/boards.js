'use strict';

const boards = (app, _, done) => {
  app.post('/', async (req, reply) => {
    reply.code(201).send({ id: Math.random(), name: req.body.name });
  });

  done();
};

module.exports = boards;
