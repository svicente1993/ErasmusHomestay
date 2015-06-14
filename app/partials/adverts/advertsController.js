var advertsController = angular.module('advertsController', []);

advertsController.controller('AdvertsController',
  ['$scope','$http','$state', '$stateParams',
   function($scope, $http, $state, $stateParams)
{
	var  country = $stateParams.country;
	angular.element(document).ready(function () {
        
   	});

	//https://cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A:javascript-key=J7dwTsaTuT9AKgjmDFaMyQaF9z2lt0j1RPFb99tN@api.parse.com/1/classes/Adv
	
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

	$scope.newAdvert = function(){
		users();
		
		//$('#newAdvert').attr('aria-hidden', false);
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

}]);

/*

var advertsController = angular.module('advertsController', ['ui.grid']);

advertsController.controller('AdvertsController',
  ['$scope','$http','$state', '$stateParams',
   function($scope, $http, $state, $stateParams)
{
	var  country = $stateParams.country;
	angular.element(document).ready(function () {
        //$('#advert').dataTable();

	$scope.myData = [{name: "Moroni", age: 50},
                 {name: "Tiancum", age: 43},
                 {name: "Jacob", age: 27},
                 {name: "Nephi", age: 29},
                 {name: "Nephi", age: 29},
                 {name: "Nephi", age: 29},
                 {name: "Nephi", age: 29},
                 {name: "Nephi", age: 29},
                 {name: "Enos", age: 34}];

    $scope.gridOptions = { data: 'myData' };
});

	//https://cebbQaa0uWmWbxh5jnmikn7UJhrnynQT0xK36n4A:javascript-key=J7dwTsaTuT9AKgjmDFaMyQaF9z2lt0j1RPFb99tN@api.parse.com/1/classes/Adv
	
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
		for (var i = 0; i < $scope.dataAdvert.length; i++) {
			$scope.dataAdvert[i].ind = i+1;
			$scope.dataAdvert[i].price = $scope.dataAdvert[i].price+'€'; 
		};
		console.log($scope.dataAdvert);
	}).error(function (data, status) {
		console.log(data);
	});

	$scope.gridOptions = { 
		data: 'dataAdvert',
		columnDefs: [
			{field:'ind', displayName:'#'},
			{field:'title', displayName:'Title'},
			{field:'price', displayName:'Price'},
			{field:'address', displayName:'Address'},
			{field:'town', displayName:'Town'},
			{field:'region', displayName:'Region'},
			{field:'country', displayName:'Country'},
			{field:'', displayName:'Actions'}, 
		]
	};

}]);

*/