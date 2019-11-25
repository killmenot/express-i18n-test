'use strict';

const http = require('http');
const port = normalizePort(process.env.PORT || '80');

const app = require('./app');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('uncaughtException', die.bind(null, 'uncaughtException'));
process.on('unhandledRejection', die.bind(null, 'unhandledRejection'));

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  console.log(`Express server listening on: ${bind}`);
}

function die(event, err) {
  console.error({
    event: event,
    code: err.code,
    message: err.message,
    stack: err.stack
  });

  setTimeout(() => process.exit(1), 0);
}
