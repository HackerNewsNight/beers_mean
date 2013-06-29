'use strict';

var beerApp = angular.module('beerApp', []);

beerApp.config(
	 function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: '/partials/landing',
			controller: 'LandingCtrl'
		});
		$routeProvider.when('/beers', {
			templateUrl: '/partials/beers',
			controller: 'BeersCtrl'
		});
		$routeProvider.when('/beers/:id', {
			templateUrl: '/partials/beer',
			controller: 'BeerCtrl'
		});
		$routeProvider.otherwise({
			templateUrl: '/partials/404'
		});
		$locationProvider.html5Mode(true);
	}
);
