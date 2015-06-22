var advertsController = angular.module('advertsController', []);

advertsController.controller('AdvertsController',
  ['$scope','$http','$state', '$stateParams',
   function($scope, $http, $state, $stateParams)
{

$scope.fillTable = function(){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/classes/Advert',
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : 'application/json'
		    },
		    params:{
		    	where: {'country': $stateParams.country}
		    } 
		}).success(function (data, status) {
			$scope.dataAdvert = data.results;
			console.log($scope.dataAdvert);
		}).error(function (data, status) {
			console.log(data);
		});
	}

	angular.element(document).ready(function () {
        $scope.fillTable();

        $('.exit-edit').click(function(){
			$('.photo-edit').remove();
		});

   	});

	//https://cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A:javascript-key=J7dwTsaTuT9AKgjmDFaMyQaF9z2lt0j1RPFb99tN@api.parse.com/1/classes/Adv
	
    $scope.testUrl = [];
    $scope.uploadImage = function(){
    	var files = document.getElementById("uploadImage").files;
    	for (var i = 0; i < files.length; i++) {
    		var file = files[i];

			var serverUrl = 'https://api.parse.com/1/files/' + file.name;

			$http({
			    method: 'POST',
			    url: serverUrl,
			    headers: {
			      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
			      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
			      'Content-Type' : file.type
			    },
			    data: file
			}).success(function (upload, status) {
				$scope.testUrl.push(upload.name);
			}).error(function (data, status) {
				console.log(data);
			});
    	};
    }
	

	$scope.newAdvert = function(){
		$('#select-user').val("");
		$scope.TitleAdvert = "";
		$scope.ContentAdvert = "";
		$scope.PriceAdvert = "";
		$scope.Rules.value1 = false;
		$scope.Rules.value2 = false;
		$scope.Rules.value3 = false;
		$scope.Rules.value4 = false;
		$scope.Rules.value5 = false;
		$scope.Rules.value6 = false;
		$scope.Rules.value7 = false;
		$scope.Facilities.value1 = false;
		$scope.Facilities.value2 = false;
		$scope.Facilities.value3 = false;
		$scope.Facilities.value4 = false;
		$scope.Facilities.value5 = false;
		$scope.Facilities.value6 = false;
		$scope.Address = "";
		$scope.Town = "";
		$scope.Region = "";
		$scope.Country = "";

		users();		
	}

	var users = function(){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/users',
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : 'application/json'
		    },
		    params:{
		    	where: {'isHost': true}
		    } 
		}).success(function (data, status) {
			$scope.users = data.results;
			console.log($scope.users);
		}).error(function (data, status) {
			console.log(data);
		});
	}

	$scope.postAdvert = function(){
		if($scope.User === undefined){
			console.log("EL USUARIOOO");
		}else{
			var rules = [];
			var facilities = [];
			if($scope.Rules.value1){
				rules.push("Please keep our home secure and double-lock the front door when entering and leaving the house.");
			}
			if($scope.Rules.value2){
				rules.push("You are welcome to use the kitchen but please clean up after yourself.");
			}
			if($scope.Rules.value3){
				rules.push("Smoking is allowed outdoors only.");
			}
			if($scope.Rules.value4){
				rules.push("Please do not invite strangers into my home.");
			}
			if($scope.Rules.value5){
				rules.push("No smoking in doors.");
			}
			if($scope.Rules.value6){
				rules.push("No loud music after hours.");
			}
			if($scope.Rules.value7){
				rules.push("Must like pets.");
			}

			if($scope.Facilities.value1){
				facilities.push("Barbecue");
			}
			if($scope.Facilities.value2){
				facilities.push("Internet");
			}
			if($scope.Facilities.value3){
				facilities.push("TV");
			}
			if($scope.Facilities.value4){
				facilities.push("Computer");
			}
			if($scope.Facilities.value5){
				facilities.push("Laundry");
			}
			if($scope.Facilities.value6){
				facilities.push("Bikes");
			}

			var fullAddress = $scope.Address+', '+$scope.Town+', '+$scope.Country;
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': fullAddress}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {

			    	$scope.latitude = results[0].geometry.location.lat();
			    	$scope.longitude = results[0].geometry.location.lng();

			    	$http({
					    method: 'POST',
					    url: 'https://api.parse.com/1/classes/Advert',
					    headers: {
					      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
					      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
					      'Content-Type' : 'application/json'
					    },
					    data:JSON.stringify({
					    	'user': {
							  '__type': 'Pointer',
							  'className': '_User',
							  'objectId': $scope.User.objectId
							},
					    	'title': $scope.TitleAdvert,
					    	'advert': $scope.ContentAdvert,
					    	'price': $scope.PriceAdvert,
					    	'rules': rules,
					    	'houseFacilities': facilities,
					    	'address': $scope.Address,
					    	'town': $scope.Town,
					    	'region': $scope.Region,
					    	'country': $scope.Country,
					    	'latLong': {
					          '__type': 'GeoPoint',
					          'latitude': $scope.latitude,
					          'longitude': $scope.longitude
					        }
					    })
					}).success(function (data, status) {
						$scope.advertId = data.objectId;
						$('#select-user').val("");
						$scope.User={};
						$('#new-advert').modal('hide');
						$('#reset-form-new').click();
						$scope.fillTable();
						$scope.newPhoto();
					}).error(function (data, status) {
						console.log(data);
					});

			    }else{
			    	console.log("Error obtener direccion");
			    }
		    });
		}
	}

	$scope.newPhoto = function(){
		for (var i = 0; i < $scope.testUrl.length; i++) {
			$http({
			    method: 'POST',
			    url: 'https://api.parse.com/1/classes/Photo/',
			    headers: {
			      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
			      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
			      'Content-Type' : 'application/json'
			    },
			    data: JSON.stringify({
			    	'advert': {
						'__type': 'Pointer',
						'className': 'Advert',
						'objectId': $scope.advertId
					},
					"photo": {
				        "name": $scope.testUrl[i],
				        "__type": "File"
				    }
				})
			}).success(function (data, status) {
				console.log(data);
			}).error(function (data, status) {
				console.log(data);
			});
		};
		
	}

	$scope.getAdvertById = function(){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/classes/Advert/'+$scope.idSelected,
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		    }
		}).success(function (data, status) {
			console.log(data);

			$scope.Rules.value1 = false;
			$scope.Rules.value2 = false;
			$scope.Rules.value3 = false;
			$scope.Rules.value4 = false;
			$scope.Rules.value5 = false;
			$scope.Rules.value6 = false;
			$scope.Rules.value7 = false;
			$scope.Facilities.value1 = false;
			$scope.Facilities.value2 = false;
			$scope.Facilities.value3 = false;
			$scope.Facilities.value4 = false;
			$scope.Facilities.value5 = false;
			$scope.Facilities.value6 = false;
			$scope.User = data.user;

			$('#edit-user').val(data.user.objectId);
			$scope.TitleAdvert = data.title;
			$scope.ContentAdvert = data.advert;
			$scope.PriceAdvert = data.price;
			for (var i = 0; i < data.rules.length; i++) {
				if(data.rules[i].length === 95){
					$scope.Rules.value1 = true;
				}else if(data.rules[i].length === 70){
					$scope.Rules.value2 = true;
				}else if(data.rules[i].length === 33){
					$scope.Rules.value3 = true;
				}else if(data.rules[i].length === 44){
					$scope.Rules.value4 = true;
				}else if(data.rules[i].length === 20){
					$scope.Rules.value5 = true;
				}else if(data.rules[i].length === 26){
					$scope.Rules.value6 = true;
				}else if(data.rules[i].length === 15){
					$scope.Rules.value7 = true;
				}
				for (var i = 0; i < data.houseFacilities.length; i++) {
					if(data.houseFacilities[i] === "Barbecue"){
						$scope.Facilities.value1 = true;
					}if(data.houseFacilities[i] === "Internet"){
						$scope.Facilities.value2 = true;
					}if(data.houseFacilities[i] === "TV"){
						$scope.Facilities.value3 = true;
					}if(data.houseFacilities[i] === "Computer"){
						$scope.Facilities.value4 = true;
					}if(data.houseFacilities[i] === "Laundry"){
						$scope.Facilities.value5 = true;
					}if(data.houseFacilities[i] === "Bikes"){
						$scope.Facilities.value6 = true;
					}
				};
				$scope.Address = data.address;
				$scope.Town = data.town;
				$scope.Region = data.region;
				$scope.Country = data.country;
			}
		}).error(function (data, status) {
			console.log(data);
		});
	}

	$scope.getPhotosByAdvertId = function(id){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/classes/Photo/',
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : 'application/json'
		    },
		    params:{
		    	where: {
		    		'advert': {
						'__type': 'Pointer',
						'className': 'Advert',
						'objectId': id
					}
		    	}
		    } 
		}).success(function (data, status) {
			if($scope.deleteObjects){
				$scope.deletePhotoWithoutAdvert(data.results);
				$scope.deleteObjects = false;
			}else{
				for (var i = 0; i < data.results.length; i++) {
					$('.edit').append('<a ng-click="removePhoto('+data.results[i].objectId+')"><img class="photo-edit" src="'+data.results[i].photo.url+'" ></a>');
				};
			}
		}).error(function (data, status) {
			console.log(data);
		});
	}

	$scope.removePhoto = function(id){
		console.log(id);
	}

	$scope.editAdvert = function(id){
		$scope.idSelected = id;
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/users',
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : 'application/json'
		    },
		    params:{
		    	where: {'isHost': true}
		    } 
		}).success(function (data, status) {
			$scope.users = data.results;
			$scope.getPhotosByAdvertId(id);
			$scope.getAdvertById();
		}).error(function (data, status) {
			console.log(data);
		});
	}

	$scope.putAdvert = function(){
		if($scope.User === undefined){
			console.log("EL USUARIOOO");
		}else{
			var rules = [];
			var facilities = [];
			if($scope.Rules.value1){
				rules.push("Please keep our home secure and double-lock the front door when entering and leaving the house.");
			}
			if($scope.Rules.value2){
				rules.push("You are welcome to use the kitchen but please clean up after yourself.");
			}
			if($scope.Rules.value3){
				rules.push("Smoking is allowed outdoors only.");
			}
			if($scope.Rules.value4){
				rules.push("Please do not invite strangers into my home.");
			}
			if($scope.Rules.value5){
				rules.push("No smoking in doors.");
			}
			if($scope.Rules.value6){
				rules.push("No loud music after hours.");
			}
			if($scope.Rules.value7){
				rules.push("Must like pets.");
			}

			if($scope.Facilities.value1){
				facilities.push("Barbecue");
			}
			if($scope.Facilities.value2){
				facilities.push("Internet");
			}
			if($scope.Facilities.value3){
				facilities.push("TV");
			}
			if($scope.Facilities.value4){
				facilities.push("Computer");
			}
			if($scope.Facilities.value5){
				facilities.push("Laundry");
			}
			if($scope.Facilities.value6){
				facilities.push("Bikes");
			}

			var fullAddress = $scope.Address+', '+$scope.Town+', '+$scope.Country;
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': fullAddress}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {

			    	$scope.latitude = results[0].geometry.location.lat();
			    	$scope.longitude = results[0].geometry.location.lng();

			    	$http({
					    method: 'PUT',
					    url: 'https://api.parse.com/1/classes/Advert/'+$scope.idSelected,
					    headers: {
					      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
					      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
					      'Content-Type' : 'application/json'
					    },
					    data:JSON.stringify({
					    	'user': {
							  '__type': 'Pointer',
							  'className': '_User',
							  'objectId': $scope.User.objectId
							},
					    	'title': $scope.TitleAdvert,
					    	'advert': $scope.ContentAdvert,
					    	'price': $scope.PriceAdvert,
					    	'rules': rules,
					    	'houseFacilities': facilities,
					    	'address': $scope.Address,
					    	'town': $scope.Town,
					    	'region': $scope.Region,
					    	'country': $scope.Country,
					    	'latLong': {
					          '__type': 'GeoPoint',
					          'latitude': $scope.latitude,
					          'longitude': $scope.longitude
					        }
					    })
					}).success(function (data, status) {
						console.log(data);
						$('#edit-user').val("");
						$scope.User={};
						$('.photo-edit').remove();
						$('#reset-form-edit').click();
						$('#edit-advert').modal('hide');
						$scope.fillTable();
					}).error(function (data, status) {
						console.log(data);
					});

			    }else{
			    	console.log("Error obtener direccion");
			    }
		    });
		}
	}

	$scope.deleteAdvert = function(id){
		$scope.deleteObjects = true;
		if(confirm("¿Quieres ir al índice de WebTaller?")) {
			$http({
			    method: 'DELETE',
			    url: 'https://api.parse.com/1/classes/Advert/'+id,
			    headers: {
			      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
			      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX'
			  	}
			}).success(function (data, status) {
				console.log(data);
				$scope.fillTable();
				$scope.getPhotosByAdvertId(id);
				$scope.getCommentByAdvertId(id);
			}).error(function (data, status) {
				console.log(data);
			});
		}
	}

	$scope.deletePhotoWithoutAdvert = function(id){
		for (var i = 0; i < id.length; i++) {
			$http({
			    method: 'DELETE',
			    url: 'https://api.parse.com/1/classes/Photo/'+id[i].objectId,
			    headers: {
			      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
			      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX'
			  	}
			}).success(function (data, status) {
				console.log(data);
			}).error(function (data, status) {
				console.log(data);
			});
		};
	}

	$scope.deleteCommentWithoutAdvert = function(id){
		for (var i = 0; i < id.length; i++) {
			$http({
			    method: 'DELETE',
			    url: 'https://api.parse.com/1/classes/Comment/'+id[i].objectId,
			    headers: {
			      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
			      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX'
			  	}
			}).success(function (data, status) {
				console.log(data);
			}).error(function (data, status) {
				console.log(data);
			});
		};
	}

	$scope.getCommentByAdvertId = function(id){
		$http({
		    method: 'GET',
		    url: 'https://api.parse.com/1/classes/Comment/',
		    headers: {
		      'X-Parse-Application-Id': 'cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A',
		      'X-Parse-REST-API-Key': 'daBekG0TqdY56fDkwdI7UCGv86NLRCYH4jPxJEKX',
		      'Content-Type' : 'application/json'
		    },
		    params:{
		    	where: {
		    		'advert': {
						'__type': 'Pointer',
						'className': 'Advert',
						'objectId': id
					}
		    	}
		    } 
		}).success(function (data, status) {
			console.log(data);
			$scope.deleteCommentWithoutAdvert(data.results);
		}).error(function (data, status) {
			console.log(data);
		});
	}

}]);