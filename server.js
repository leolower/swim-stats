/* global require, process */
'use strict';

var connect = require('connect');
var serveStatic = require('serve-static');


var directory = './dist';

connect()
  .use(serveStatic(directory))
  .listen(process.env.PORT || 5000);

console.log('Listening on port ', (process.env.PORT || 5000));
