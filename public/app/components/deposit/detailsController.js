var depositDetailsController = angular.module('depositDetailsController', []);

depositDetailsController.controller('DepositDetailsController', ['$scope','$http','$stateParams', function($scope, $http, $stateParams)
{
  // Document Ready
  angular.element(document).ready(function(){
    $http({
      url: window.serviceUrl + 'api/depositdetails',
      method: 'GET',
      params: { id : $stateParams.depositId},
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status) {
      $scope.details = data.content;
      if (data == null){
        myAlert('The connection has been failed, try again.');
      }
    }).error(function (data, status) {
      myAlert('The connection has been failed, try again.');
    });
  });

  // Functions

  $scope.exportDetailsToPDF = function(){
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden-deposit-details'));
    form.attr('action', window.serviceUrl+ 'pdf/DepositDetailsPDF');

    /* ID */
    form.append('<input type="hidden" name="id" value="' + $stateParams.depositId +'" />');
    form.submit();
  }
}]);
