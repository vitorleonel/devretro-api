'use strict';

const fastify = require('fastify');

function build(options = {}) {
  const app = fastify(options);

  // plugins
  app.register(require('fastify-socket.io'), { cors: { origin: '*' } });

  // routes
  app.register(require('./routes/boards'), { prefix: '/boards' });

  // default route
  app.get('/', async function (_, reply) {
    reply.send({ version: process.env.npm_package_version });
  });

  return app;
}

module.exports = build;
