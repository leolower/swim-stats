/* global angular */
angular.module('swim-stats.module1', ['ui.router', 'ngDelay', 'stpa.morris'])

/////////////////
// CONTROLLERS //
/////////////////
.controller('StatAddController', StatAddController)


//////////////
// SERVICES //
//////////////
.factory('StatService', StatService)

;
