'use strict';

var beerApp = angular.module('', []);

beerApp.config(
	 function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: '/partials/landing.html',
			controller: 'LandingCtrl'
		});

		$routeProvider.when('/beers', {
			templateUrl: '/partials/beers.html',
			controller: 'TasksCtrl'
		});
		$routeProvider.when('/beers/:id', {
			templateUrl: '/partials/beer.html',
			controller: 'TransactionsCtrl'
		});
		$routeProvider.otherwise({
			templateUrl: 'partials/404.html'
		});
		$locationProvider.html5Mode(true);
	}
);
