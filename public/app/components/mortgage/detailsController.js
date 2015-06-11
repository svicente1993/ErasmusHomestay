var detailsController = angular.module('mortgageDetailsController', []);

mortgageSearchController.controller('MortgageDetailsController', ['$scope','$http','$stateParams', function($scope, $http, $stateParams)
{

  // Document Ready
  angular.element(document).ready(function(){

    

    $http({
      url: window.serviceUrl + 'api/mortgagedetails',
      method: 'GET',
      params: { id : $stateParams.productId},
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status) {
      $scope.details = data.content;
      if (data == null){
        myAlert('The connection has been failed, try again.');
      }
    }).error(function (data, status) {
      myAlert('The connection has been failed, try again.');
    });
    // End to Document Ready
  });

  //***** Functions ******//

  $scope.exportToPDF = function(){
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden-mortgage-details'));
    form.attr('action', window.serviceUrl+ 'pdf/MortgageDetailsPDF');

    /* ID */
    debugger;
    form.append('<input type="hidden" name="id" value="' + $stateParams.productId +'" />');
    form.submit();
  }



}]);
