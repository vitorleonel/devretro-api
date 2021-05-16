'use strict';

const fastify = require('fastify');

function build(opts = {}) {
  const app = fastify(opts);

  app.get('/', async function (_, reply) {
    reply.send({ hello: 'world' });
  });

  return app;
}

module.exports = build;
