'use strict';

const server = require('./app')({
  logger: {
    level: 'info',
    prettyPrint: true,
  },
});

server.listen(3000, (err, address) => {
  if (err) {
    process.exit(1);
  }

  server.log.info(`server listening on ${address}`);
});
