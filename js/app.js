

var MyApp = angular.module("MyApps", ['ngRoute','angularUtils.directives.dirPagination']);


//directive
	MyApp.directive('menuTitle',function(){

	return{
		restirct : 'A',
		templateUrl : 'menu.html'
	}
	});

	MyApp.directive('modalForm',function(){

	return{
		restirct : 'A',
		templateUrl : 'formPelanggan.html'
	}
	});

	MyApp.directive('modalFormUsers',function(){

	return{
		restirct : 'A',
		templateUrl : 'formUsers.html'
	}
	});


//route
MyApp.config(function($routeProvider){

	$routeProvider
	.when('/pelanggan',{
		templateUrl : 'pelanggan.html',
		//controller : 'add'
	})

	$routeProvider
	.when('/users',{
		templateUrl : 'users.html',
		//controller : 'add'
	})

	.when('/sample',{
		templateUrl: 'sample.html',
	})

	.when('/home',{
		templateUrl: 'home.html',
	})

	.otherwise({redirectTo:'home'});
});
