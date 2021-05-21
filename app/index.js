'use strict';

const fastify = require('fastify');
const socketIOPlugin = require('fastify-socket.io');
const corsPlugin = require('fastify-cors');

const mongoosePlugin = require('./plugins/mongoose');

const boardsRoute = require('./routes/boards');

function build(options = {}) {
  const app = fastify(options);

  // plugins
  app.register(mongoosePlugin, { uri: process.env.DATABASE_URI });
  app.register(socketIOPlugin, { cors: { origin: '*' } });
  app.register(corsPlugin);

  // routes
  app.register(boardsRoute, { prefix: '/boards' });

  // default route
  app.get('/', async function (_, reply) {
    reply.send({ version: process.env.npm_package_version });
  });

  return app;
}

module.exports = build;
