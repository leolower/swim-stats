/* global angular */
angular.module('swim-stats.module1', ['ui.router', 'ngDelay', 'n3-line-chart'])

/////////////////
// CONTROLLERS //
/////////////////
.controller('StatAddController', StatAddController)


//////////////
// SERVICES //
//////////////
.factory('StatService', StatService)

;
