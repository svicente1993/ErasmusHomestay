var depositComparisonController = angular.module('depositComparisonController', []);

depositComparisonController.controller('DepositComparisonController', ['$scope','$http','$stateParams', function($scope, $http, $stateParams)
{
  $scope.comparisonData = $stateParams.depositSearchData;
  $scope.comparisonData["ids"] = $stateParams.ids;
  $scope.valueResults = [];

  $http({
    url: window.serviceUrl + '/api/DepositComparison',
    method: 'POST',
    data: JSON.stringify($scope.comparisonData),
    headers: {'Content-Type': 'application/json'}
  }).success(function (data, status) {
    $scope.temp = data.content;
    buildData();
  }).error(function (data, status) {
      console.log('ERROR: ' + data);
  });

  $scope.depositCompareToPDF = function(){
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden-deposit-comparison'));
    form.attr('action', window.serviceUrl+ 'pdf/DepositComparisonPDF');
    debugger;
    if($scope.comparisonData.ids.length != 0){
      for(var i = 0; i < $scope.comparisonData.ids.length; i++)
        form.append('<input type="hidden" name="ids" value="'+$scope.comparisonData.ids[i]+'" />');
      form.submit();
    }else{
      alert("Be sure that you select at least one Deposit.");
    }

  }

  $scope.depositCompareToCSV = function(){
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden-deposit-comparison'));
    form.attr('action', window.serviceUrl+ 'excel/DepositComparisonExcel');
    if($scope.comparisonData.ids.length != 0){
      for(var i = 0; i < $scope.comparisonData.ids.length; i++)
        form.append('<input type="hidden" name="ids" value="'+$scope.comparisonData.ids[i]+'" />');
      form.submit();
    }else{
      alert("Be sure that you select at least one Deposit.");
    }
  }


  $scope.updateIdsChecked = function(id){
    if ($scope.comparisonData.ids.indexOf(id) === -1)
          $scope.comparisonData.ids.push(id);
    else
    $scope.comparisonData.ids.splice($scope.comparisonData.ids.indexOf(id), 1);
    if($scope.comparisonData.ids.length == 1){
      $('#'+id).prop('checked', true);
      $scope.comparisonData.ids.push(id);
    }else{
      $scope.showHideProduct(id);
    }

  }


  $scope.showHideProduct = function(depositId){
    $('.head-' + depositId).toggleClass('comparison-visibility');
    $('.cell-' + depositId).toggleClass('comparison-visibility');

  }

  var buildData = function(){
    angular.forEach($scope.temp.rows, function(i) {

      var obj = [
        i.minimumInvestmentAmount,
        i.maximumInvestmentAmount,
        i.dateOfRate,
        i.term
      ];
      for (var i = 0; i < obj.length; i++) {
        if (i < 3) {
          if (i == 0 || i == 1) {
            // minimumInvestmentAmount and maximumInvestmentAmount
            if (obj[i] == '0.000000') {
              if (i == 0) { obj[i] = 'No minimum'; } else { obj[i] = 'No maximum'; }
            } else if (obj[i] != '0.000000' && obj[i] != null && obj[i] != '') {
              obj[i] = Math.round(parseFloat(obj[i]) * 100) / 100 + '€';
            } else if (obj[i] == '') {
              obj[i] = 'N/A';
            }
            // format date
          } else if (i == 2) {
            var d = new Date(parseInt(obj[i]));
            var day = d.getDate();
            var month = d.getMonth();
            var year = d.getFullYear();
            obj[i] = ((month + 1) + "/" + day + "/" + year);
          }
          // term
        } else {
          if (obj[i] != null && obj[i] != '') {
            obj[i] = Math.round(parseFloat(obj[i]) * 100) / 100 + '%';
          } else if (obj[i] == '' || obj[i] == null) {
            obj[i] = 'N/A';
          }
        }
      }
      $scope.valueResults.push(obj);
    });
  }
}]);
