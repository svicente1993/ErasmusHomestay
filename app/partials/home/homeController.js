var homeController = angular.module('homeController', []);

homeController.controller('HomeController',
  ['$scope','$http','$state',
   function($scope, $http, $state)
{

	$scope.goToAdverts = function(country){
		// if return -1 means that not contain '-'
		if(country.currentTarget.id.indexOf('-') > -1){
			var id = country.currentTarget.id.split('-');
			id = id[0].charAt(0).toUpperCase() + id[0].slice(1);
			console.log(id);
		}else{
			var id = country.currentTarget.id;
			id = id.charAt(0).toUpperCase() + id.slice(1);
			console.log(id);
		}
		$state.go('adverts', {country : id})
	}

}]);