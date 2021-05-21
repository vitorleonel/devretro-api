'use strict';

const fastify = require('fastify');

function build(options = {}) {
  const app = fastify(options);

  // plugins
  app.register(require('./plugins/mongoose'), {
    uri: process.env.DATABASE_URI,
  });
  app.register(require('fastify-socket.io'), { cors: { origin: '*' } });
  app.register(require('fastify-cors'));

  // routes
  app.register(require('./routes/boards'), { prefix: '/boards' });

  // default route
  app.get('/', async function (_, reply) {
    reply.send({ version: process.env.npm_package_version });
  });

  return app;
}

module.exports = build;
