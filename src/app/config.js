function ConfigFn($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/module1/add');

	$stateProvider
		// .state('index', {
		// 	url: '/',
		// 	templateUrl: 'common/partials/index.html',
		// 	controller: 'CommonController as CommonController'
		// })
		.state('add', {
			url: '/module1/add',
			templateUrl: 'module1/partials/add.html',
			controller: 'StatAddController as StatAddController',
			controllerAs: 'module1',
			resolve: StatAddController.resolve
		})
	;
}
