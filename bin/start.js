if (!process.env.NODE_ENV) require('dotenv').load(); // eslint-disable-line global-require

/* eslint-disable import/first */
const debug = require('debug').default;
const server = require('../src/server').default;

/**
 * onListen callback for server
 * @returns {undefined}
 */
function onListen() {
  console.log(`Listening on port ${process.env.PORT}`);
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * onError callback
 * @param {Error} err the error
 * @returns {undefined}
 */
function onError(err) {
  if (err.syscall !== 'listen') throw err;

  const bind = typeof port === 'string' ? `Pipe ${process.env.PORT}` : `Port ${process.env.PORT}`;

  switch (err.code) {
    case 'EACCESS':
      console.log(`${bind} requires elevated privilege`);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      break;
    default:
      throw err;
  }
}

server.on('listening', onListen);
server.on('error', onError);
server.listen(process.env.PORT);
