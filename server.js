/* global require, process */
'use strict';

var connect = require('connect');
var directory = 'build';

connect()
  .use(connect.static(directory))
  .listen(process.env.PORT || 5000);

console.log('Listening on port ', (process.env.PORT || 5000));
