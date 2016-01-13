/*[] dependencies*/


var angular_app = angular.module('angular_app', ['ngRoute']);

angular_app.controller('appController', ['$scope', function($scope){

	$scope.appName = 'Jefferson';

	$scope.atualizarNome = function(newname){
		$scope.appName = newname;	
	}
}]);

//Run on app start
angular_app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
	
	$routeProvider
	.when('/', {
		templateUrl: 'home.html',
		controller : 'home_controller'
	})
	.when('/herois', {
		templateUrl: 'herois.html',
		controller : 'herois_controller'
	})
	.when('/viloes', {
		templateUrl: 'viloes.html',
		controller : 'viloes_controller'
	})
	.when('/herois/homem-aranha', {
		templateUrl: 'herois-aranha.html',
		controller : 'herois_aranha_controller'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);

}]);

angular_app.controller('home_controller'  , ['$scope', function($scope){ }]);
angular_app.controller('herois_controller', ['$scope', function($scope){ }]);
angular_app.controller('viloes_controller', ['$scope', function($scope){ }]);
angular_app.controller('herois_aranha_controller', ['$scope', function($scope){ }]);