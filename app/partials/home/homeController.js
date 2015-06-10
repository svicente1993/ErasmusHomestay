var homeController = angular.module('homeController', []);

homeController.controller('HomeController',
  ['$scope','$http','$state',
   function($scope, $http, $state)
{
	/*
	$http({
	    method: 'GET',
	    url: 'https://api.parse.com/1/login',
	    headers: {
	      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
	      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
	      'Content-Type' : 'application/x-www-form-urlencoded'
	    },
	    params:{'username':'admin@gmail.com',
				'password':'admin'} 
	}).success(function (data, status) {
		$scope.token=data.sessionToken;
		console.log(data);
	}).error(function (data, status) {
		console.log(data);
	});

	$scope.deleteUser = function(){
		$http({
	    method: 'DELETE',
	    url: 'https://api.parse.com/1/users/GbJDOzzYp5',
	    headers: {
	      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
	      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
	      'X-Parse-Session-Token' : $scope.token,
	    },
	    params:{} 
	}).success(function (data, status) {
		console.log(data);
		$scope.deleteSession();
	}).error(function (data, status) {
		console.log(data);
		$scope.deleteSession();
	});
	}

	$scope.deleteSession = function(){
		$http({
	    method: 'POST',
	    url: 'https://api.parse.com/1/logout',
	    headers: {
	      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
	      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
	      'X-Parse-Session-Token' : $scope.token
	    },
	    params:{} 
	}).success(function (data, status) {
		console.log(data);
	}).error(function (data, status) {
		console.log(data);
	});
	}
	*/

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