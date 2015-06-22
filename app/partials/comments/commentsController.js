var commentsController = angular.module('commentsController', []);

commentsController.controller('CommentsController',
  ['$scope','$http','$state',
   function($scope, $http, $state)
{

	$scope.fillTable = function(){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/classes/Comment',
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : 'application/json'
		    },
		    params: {
		    	order: '-createdAt' 
		    }
		}).success(function (data, status) {
			$scope.advertName = [];
			$scope.UserName = [];
			$scope.dataComment = data.results;
			for (var i = 0; i < data.results.length; i++) {
				//$scope.advertName.push(data.results[i].advert.objectId);
				//$scope.UserName.push(data.results[i].student.objectId);
				$scope.getAdvertById(data.results[i].advert.objectId, i);
				$scope.getUserById(data.results[i].student.objectId, i);
			};
			
		}).error(function (data, status) {
			console.log(data);
		});
	}

	angular.element(document).ready(function () {
        $scope.fillTable();       
   	});

	$scope.getAdvertById = function(id, i){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/classes/Advert/'+id,
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		    }
		}).success(function (data, status) {
			$scope.dataComment[i].advert = data.title;
		}).error(function (data, status) {
			console.log(data);
		});
	}

	$scope.getUserById = function(id, i){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/users/'+id,
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX'
		    }
		}).success(function (data, status) {
			$scope.dataComment[i].student = data.name+' '+data.lastName;
		}).error(function (data, status) {
			console.log(data);
		});
	}

	$scope.deleteComment = function(id){
		$scope.deleteObjects = true;
		if(confirm("¿Quieres ir al índice de WebTaller?")) {
			$http({
			    method: 'DELETE',
			    url: 'https://api.parse.com/1/classes/Comment/'+id,
			    headers: {
			      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
			      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX'
			  	}
			}).success(function (data, status) {
				console.log(data);
				$scope.fillTable();
			}).error(function (data, status) {
				console.log(data);
			});
		}
	}

}]);