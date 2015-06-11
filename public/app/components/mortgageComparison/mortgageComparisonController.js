var mortgageComparisonController = angular.module('mortgageComparisonController',[]);

mortgageComparisonController.controller('MortgageComparisonController', ['$scope','$http','$stateParams', function($scope, $http, $stateParams)
{
  $scope.searchData = $stateParams.searchData;
  $scope.searchData['ids'] = $stateParams.ids;
  $scope.valueResults = [];



  $scope.mortgageCompareToPDF = function(event){
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden-mortgage-comparison'));
    form.attr('action', window.serviceUrl+ 'pdf/MortgageComparisonPDF');

    if($scope.searchData.ids.length != 0){
      for(var i = 0; i < $scope.searchData.ids.length; i++)
        form.append('<input type="hidden" name="ids" value="' + $scope.searchData.ids[i] + '" />');
      form.submit();
    }else{
      alert("Be sure that you select at least one Mortgage.");
    }
  }

  $scope.mortgageCompareToCSV = function(){
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden-mortgage-comparison'));
    form.attr('action', window.serviceUrl+ 'excel/MortgageComparisonExcel');

    if($scope.searchData.ids.length != 0){
      for(var i = 0; i < $scope.searchData.ids.length; i++)
        form.append('<input type="hidden" name="ids" value="' + $scope.searchData.ids[i] + '" />');
      form.submit();
    }else{
      alert("Be sure that you select at least one Mortgage.");
    }

  }



  $http({
    method: 'POST',
    url: window.serviceUrl + 'api/mortgagecomparison',
    data: JSON.stringify($scope.searchData),
    headers: {'Content-Type': 'application/json'}
  }).success(function (data, status) {
      $scope.compareResults = data.content;
      buildData();

  }).error(function (data, status) {
      console.log('ERROR: '+data);
  });

  var updateIdsChecked = function(id){
    if ($scope.searchData.ids.indexOf(id) === -1)
        $scope.searchData.ids.push(id);
    else
    $scope.searchData.ids.splice($scope.searchData.ids.indexOf(id), 1);
    if($scope.searchData.ids == 0)
      $('.btn-no-action').addClass('disabled');
    else
      $('.btn-no-action').removeClass('disabled');
  }

  $scope.showHideProduct = function(productId){
    $('.head-'+productId).toggleClass('comparison-visibility');
    $('.cell-'+productId).toggleClass('comparison-visibility');
    updateIdsChecked(productId);
  }

  var buildData = function(){
    angular.forEach($scope.compareResults.rows, function(i) {
      var obj = [
        i.mortgageProvider,
        i.grossRate,
        i.apr,
        i.maxLTV,
        i.monthlyRepaymentDuringDiscountedFixedPeriod,
        i.monthlyRepaymentAfterDiscountedFixedPeriod,
        i.interestCalculationMethod,
        i.tieInPeriod,
        i.maxLoanTerm,
        i.followOnMortgage,
        i.followOnAPR,
        i.totalAmountPayable,
        i.totalInterestOver1Years,
        i.totalInterestOver3Years,
        i.totalInterestOver5Years,
        i.totalInterestOver10Years,
        i.totalInterestOverLife,
        i.costOver1Years,
        i.costOver3Years,
        i.costOver5Years,
        i.costOver10Years,
        i.costOverLife
      ];
      for (var i = 0; i < obj.length; i++) {
        if (i > 0 && i <= 3 || i == 10) {
          // rate to maximum loan to value and follow on APR
          if (obj[i] > 0) {
            obj[i] = obj[i] + '%';
          } else {
            obj[i] = 'N/A';
          }
        } else if (i == 4 || i == 5 || i >= 11 && i <= 21) {
          if (obj[i] > 0) {
            obj[i] = obj[i] + '€';
          } else {
            obj[i] = 'N/A';
          }
        } else if (i == 8) {
          if (obj[i] == '') {
            obj[i] = 'N/A';
          } else {
            obj[i] = obj[i] + ' Years'
          }
        } else {
          if (obj[i] == '') {
            obj[i] = 'N/A';
          }
        }
      }
      $scope.valueResults.push(obj);
    });
  }

}]);
