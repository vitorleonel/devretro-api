'use strict';

const fp = require('fastify-plugin');
const mongoose = require('mongoose');

async function fastifyMongoose(fastify, options, next) {
  const { uri } = options;

  if (!uri) {
    next(new Error('`uri` parameter is required'));

    return;
  }

  delete options.uri;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      ...options,
    });

    next();
  } catch (error) {
    fastify.log.error(error, 'Error connecting to MongoDB');

    next(error);
  }
}

module.exports = fp(fastifyMongoose, {
  name: 'fastify-mongoose',
});
