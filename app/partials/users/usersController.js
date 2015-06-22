var usersController = angular.module('usersController', []);

usersController.controller('UsersController',
  ['$scope','$http','$state',
   function($scope, $http, $state)
{

	$scope.fillTable = function(){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/classes/_User',
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : 'application/json'
		    },
		    params:{
		    	where: {'isHost': true}
		    } 
		}).success(function (data, status) {
			$scope.dataUsers = data.results;
		}).error(function (data, status) {
			console.log(data);
		});
	
	}

	angular.element(document).ready(function () {
        $('.modal-backdrop.fade.in').removeClass('modal-backdrop fade in');
        $('.modal-open').removeClass('modal-open');
        $scope.fillTable();

   	});

    $scope.uploadImage = function(){
    	var file = document.getElementById("uploadImage").files;

		var serverUrl = 'https://api.parse.com/1/files/' + file[0].name;

		$http({
		    method: 'POST',
		    url: serverUrl,
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : file[0].type
		    },
		    data: file[0]
		}).success(function (upload, status) {
			$scope.postUser(upload.name);
			$('#new-user').modal('hide');
		}).error(function (data, status) {
			console.log(data);
		});
	}
    
	$scope.newUser = function(){
		$scope.NameUser = "";
		$scope.LastNameUser = "";
		$scope.EmailUser = "";
		$scope.PasswordUser = "";
		$scope.PhoneUser = "";
	}

	$scope.postUser = function(url){
	   	$http({
		    method: 'POST',
		    url: 'https://api.parse.com/1/classes/_User',
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : 'application/json'
		    },
		    data:JSON.stringify({
		    	'username': $scope.EmailUser,
		    	'name': $scope.NameUser,
		    	'lastName': $scope.LastNameUser,
		    	'email': $scope.EmailUser,
		    	'password': $scope.PasswordUser,
		    	'phone': $scope.PhoneUser,
		    	"photo": {
			        "name": url,
			        "__type": "File"
			    },
			    "isHost": true
		    })
		}).success(function (data, status) {
			$('#reset-form-new').click();
			$scope.fillTable();
		}).error(function (data, status) {
			console.log(data);
		});
	}

	$scope.deleteUser = function(id){
		$scope.deleteObjects = true;
		if(confirm("¿Quieres ir al índice de WebTaller?")) {
			$http({
			    method: 'DELETE',
			    url: 'https://api.parse.com/1/classes/_User/'+id,
			    headers: {
			      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
			      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX'
			  	}
			}).success(function (data, status) {
				console.log(data);
				$scope.fillTable();
				//$scope.getPhotosByAdvertId(id);
				//$scope.getCommentByAdvertId(id);
			}).error(function (data, status) {
				console.log(data);
			});
		}
	}

	$scope.editUser = function(id){
		$scope.userId = id;
		$scope.getUserById(id);
	}

	$scope.getUserById = function(id){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/classes/_User/'+id,
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		    }
		}).success(function (data, status) {
			$scope.NameUser = data.name;
			$scope.LastNameUser = data.lastName;
			$scope.EmailUser = data.email;
			$scope.PasswordUser = data.password;
			$scope.PhoneUser = data.phone;
			$('.edit').attr('src', data.photo.url);
		}).error(function (data, status) {
			console.log(data);
		});
	}

	$scope.putUser = function(){
	
		$http({
		    method: 'PUT',
		    url: 'https://api.parse.com/1/classes/_User/'+$scope.userId,
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : 'application/json'
		    },
		    data:JSON.stringify({
		    	'username': $scope.EmailUser,
		    	'name': $scope.NameUser,
		    	'lastName': $scope.LastNameUser,
		    	'email': $scope.EmailUser,
		    	'password': $scope.PasswordUser,
		    	'phone': $scope.PhoneUser
		    })
		}).success(function (data, status) {
			console.log(data);
			$('#edit-user').val("");
			$scope.userId="";
			$('#reset-form-edit').click();
			$('#edit-user').modal('hide');
			$scope.fillTable();
		}).error(function (data, status) {
			console.log(data);
		});
	}
}]);