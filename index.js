'use strict';

require('dotenv').config();

const server = require('./app')({
  logger: {
    level: 'error',
    prettyPrint: true,
  },
});

server.listen(3000, (err, address) => {
  if (err) {
    server.log.error(err);

    process.exit(1);
  }

  server.log.info(`server listening on ${address}`);
});
