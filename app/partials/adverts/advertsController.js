var advertsController = angular.module('advertsController', []);

advertsController.controller('AdvertsController',
  ['$scope','$http','$state', '$stateParams',
   function($scope, $http, $state, $stateParams)
{
	var  country = $stateParams.country;
	angular.element(document).ready(function () {
        $('#advert').dataTable();

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
	    	where: {'country': 'Ireland'}
	    } 
	}).success(function (data, status) {
		$scope.dataAdvert = data.results;
		console.log($scope.dataAdvert);
	}).error(function (data, status) {
		console.log(data);
	});
}]);