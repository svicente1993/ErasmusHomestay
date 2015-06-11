var depositSearchController = angular.module('depositSearchController', []);

depositSearchController.controller('DepositSearchController',
  ['$scope','$http','$state', '$localStorage',
   function($scope, $http, $state, $localStorage)
{
  $scope.CheckBoxModel = {Master : false};
  $scope.basicSearchOptions = {};
  $scope.idsArray = [];
  var loadingList = { accTypeList: false, institutionList: false,
                      termList: false, reportList: false }

  function onLoaded(listName){
    loadingList[listName] = true;
    if(loadingList.accTypeList &&
       loadingList.institutionList &&
       loadingList.termList &&
       loadingList.reportList){
         onAllCompleted();
       }
  }

  function onAllCompleted() {
    var obj = $localStorage.getObject('depositSearchOptions');
    if (obj !== 0){
      $scope.InvestmentAmount = obj.basic.investmentAmount;
      var d = new Date(parseInt(obj.basic.dateInvested));
      var day = d.getDate();
      var month = d.getMonth();
      var year = d.getFullYear();
      $scope.DateInvest = obj.basic.dateInvested = ((month + 1) + "/" + day + "/" + year);
      $scope.AccType = obj.basic.accountType;
      $scope.Institute = obj.basic.institution;
      $scope.Term = obj.basic.term;
      if(obj.advanced !== null){
        if ($('#adv-search').hasClass('ng-hide'))
          $scope.showAdvSearch();

        $scope.depositSearchReportOption = $localStorage.getObject('reportOptions');
      }
      $scope.basicSearchOptions = obj;
      sendSearch();
      $localStorage.delete('depositSearchOptions');
      $localStorage.delete('reportOptions');
    }
  }

  $http.get(window.serviceUrl + '/api/accounttype').
    success(function(data){
      $scope.accountTypes = data.content;
      $scope.accountTypes.push({id: '0', name: 'All'});
      onLoaded('accTypeList');
    }).
    error(function(data){
      myAlert('Please, refresh the page because the data failed');
    });
  $http.get(window.serviceUrl + '/api/institute').
    success(function(data){
      $scope.institutes = data.content;
      $scope.institutes.push({id: '0', name: 'All'});
      onLoaded('institutionList');
    }).
    error(function(data){
      myAlert('Please, refresh the page because the data failed');
    });
  $http.get(window.serviceUrl + '/api/term').
    success(function(data){
      $scope.terms = data.content;
      onLoaded('termList');
    }).
    error(function(data){
      myAlert('Please, refresh the page because the data failed');
    });
  $http.get(window.serviceUrl + '/api/depositSearchReportOptions').
    success(function(data){
      $scope.depositSearchReportOptions = data.content;
      onLoaded('reportList');
    }).
    error(function(data){
      myAlert('Please, refresh the page because the data failed');
    });

  //*****FUNCTIONS*****
  $scope.downloadReport = function(){
    console.log('Download!');
  }

  $scope.saveReport = function(){
    console.log('Save!');
  }

  $scope.toPDFDepositSearch = function(){
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden-deposit-search'));
    form.attr('action', window.serviceUrl+ 'pdf/DepositSearchPDF');

    /* IDS */
    for(var i = 0; i < $scope.idsArray.length; i++){
      form.append('<input type="hidden" name="ids" value="'+$scope.idsArray[i]+'" />');
    }

    /* Basic */
    form.append('<input type="hidden" name="basic.investmentAmount" value="'+$scope.basicSearchOptions.basic.investmentAmount+'" />');
    form.append('<input type="hidden" name="basic.accountType" value="'+$scope.basicSearchOptions.basic.accountType+'" />');
    form.append('<input type="hidden" name="basic.institution" value="'+$scope.basicSearchOptions.basic.institution+'" />');
    form.append('<input type="hidden" name="basic.term" value="'+$scope.basicSearchOptions.basic.term+'" />');
    form.append('<input type="hidden" name="basic.dateInvested" value="'+$scope.basicSearchOptions.basic.dateInvested+'" />');

    /* Advanced */
    if($scope.basicSearchOptions.advanced !== null){
      if($scope.basicSearchOptions.advanced.reportOption.length > 0){
        for(var i = 0; i < $scope.basicSearchOptions.advanced.reportOption.length; i++){
          form.append('<input type="hidden" name="advanced.reportOption" value="'+$scope.basicSearchOptions.advanced.reportOption[i]+'" />');
        }
      }
    }
    form.submit();
  }

  $scope.toCSVDepositSearch = function(e){

    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden-deposit-search'));
    form.attr('action', window.serviceUrl+ 'excel/DepositSearchExcel');

    /* IDS */
    for(var i = 0; i < $scope.idsArray.length; i++){
      form.append('<input type="hidden" name="ids" value="'+$scope.idsArray[i]+'" />');
    }

    /* Basic */
    form.append('<input type="hidden" name="basic.investmentAmount" value="'+$scope.basicSearchOptions.basic.investmentAmount+'" />');
    form.append('<input type="hidden" name="basic.accountType" value="'+$scope.basicSearchOptions.basic.accountType+'" />');
    form.append('<input type="hidden" name="basic.institution" value="'+$scope.basicSearchOptions.basic.institution+'" />');
    form.append('<input type="hidden" name="basic.term" value="'+$scope.basicSearchOptions.basic.term+'" />');
    form.append('<input type="hidden" name="basic.dateInvested" value="'+$scope.basicSearchOptions.basic.dateInvested+'" />');

    /* Advanced */
    if($scope.basicSearchOptions.advanced !== null){
      if($scope.basicSearchOptions.advanced.reportOption.length > 0){
        for(var i = 0; i < $scope.basicSearchOptions.advanced.reportOption.length; i++){
          form.append('<input type="hidden" name="advanced.reportOption" value="'+$scope.basicSearchOptions.advanced.reportOption[i]+'" />');
        }
      }
    }
    form.submit();
    e.preventDefault();
  }

  // Button Advanced Search
  $scope.showAdvSearch = function(item) {
    $('#adv-search').toggleClass('show');
    $('.i-search i').toggleClass('glyphicon-eye-close');
  };

  // Details about one row
  $scope.moreDetails = function(id) {
    var url = $state.href('depositdetails', {depositId: id});
    window.open(url, '_blank');
  }

  // Export more details to PDF in result table
  $scope.exportDetailsSearchToPDF = function(id) {
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden-deposit-search'));
    form.attr('action', window.serviceUrl+ 'pdf/DepositDetailsPDF');

    /* ID */
    form.append('<input type="hidden" name="id" value="' + id +'" />');
    form.submit();
  }

  // Get ids to compare
  $scope.getIds = function(id) {
    $scope.CheckBoxModel.Master = false;
    if ($scope.idsArray.indexOf(id) === -1)
      $scope.idsArray.push(id);
    else
      $scope.idsArray.splice($scope.idsArray.indexOf(id), 1);
    if($scope.idsArray.length >= 2)
      $('.btn-no-action').removeClass('disabled');
    else
      $('.btn-no-action').addClass('disabled');
  }

  // Get all ids to compare
  $scope.getAllIds = function() {
    $scope.idsArray = [];
    if ($scope.CheckBoxModel.Master){
      $('.check-result').prop('checked', true);
      angular.forEach($scope.temp.rows, function(value, key){
        $scope.idsArray.push(value.accountId);
      });
    } else
      $('.check-result').prop('checked', false);
    if($scope.idsArray.length >= 2)
      $('.btn-no-action').removeClass('disabled');
    else
      $('.btn-no-action').addClass('disabled');
  }

  $scope.checkIdsArray = function(id){
    if(id.length >= 2){
      $state.go('depositcomparison', {ids : id, depositSearchData: $scope.basicSearchOptions})
      $localStorage.setObject('depositSearchOptions', $scope.basicSearchOptions);
      if ($scope.depositSearchReportOption != undefined){
        $localStorage.setObject('reportOptions', $scope.depositSearchReportOption);
      }
    } else {
      alert('Be sure that you select more than one row to compare');
    }
  }

  // To know if some advanced option is selected to be sure that it is a basic search
  $scope.isBasicSearch = function(){
    if (($scope.depositSearchReportOption === undefined || $scope.depositSearchReportOption.length === 0)){
        return true
    }else{
        return false;
    }
  }

// To get advanced values
  $scope.getAdvancedValues = function(){
    if (!($scope.depositSearchReportOption === undefined || $scope.depositSearchReportOption.length === 0)){
      for (i in $scope.depositSearchReportOption){
        $scope.reportOptionsResults.push($scope.depositSearchReportOption[i].name.replace(/ /g,""));
      }
    }
  };

  // To split a string (rateBand) for round its numbers
  $scope.splitNumber = function(rateBand){
    if (rateBand !== null) {
      var values = rateBand.split(" - ");
      return rateBand = parseFloat(values[0]).toFixed(2) + ' - ' + parseFloat(values[1]).toFixed(2);
    } else {
      return null;
    }
  };

  // To split a string (dateOfRate) for show in a correct format
  $scope.splitDate = function(dateOfRate){
    if (dateOfRate !== null) {
      var values = dateOfRate.split(" ");
      return dateOfRate = values[0];
    } else {
      return null;
    }
  };

  $scope.sendAdvancedSearch = function(){
    // Empty list of ids each time I click on search
    $scope.idsArray = [];
    $scope.CheckBoxModel.Master = false;
    $scope.listResult = false;
    if ($scope.AccType === undefined || $scope.AccType === '' ||
        $scope.Institute === undefined || $scope.Institute === '' ||
        $scope.Term === undefined || $scope.Term === '') {
      myAlert('Be sure that you fill out the form');
      if ($("#alert-top-deposit").hasClass("hide")) {
        $('#alert-top-deposit').toggleClass('hide');
      }
    } else {
      if (!$("#alert-top-deposit").hasClass("hide")) {
        $('#alert-top-deposit').toggleClass('hide');
      }
      $scope.$broadcast('show-errors-check-validity');
      // If the form is valid*/
      if ($scope.depositForm.$valid) {
        // Get data from form
        $scope.basicSearchOptions = {
          basic : {
            investmentAmount : parseFloat($scope.InvestmentAmount, 2),
            dateInvested  : new Date($scope.DateInvest).getTime(),
            accountType : $scope.AccType,
            institution : $scope.Institute,
            term : $scope.Term,
          },
          advanced : null
        };

        // Handle advanced search
        if (!$scope.isBasicSearch()){
          $scope.reportOptionsResults = []
          // Get data from inputs
          $scope.getAdvancedValues();
          // Update of json to send
          $scope.basicSearchOptions.advanced = {
            reportOption : $scope.reportOptionsResults
          }
        };
        sendSearch();
      }
    }
  }

  var sendSearch = function () {
    $http({
      url: window.serviceUrl + '/api/depositsearch',
      method: 'POST',
      data: JSON.stringify($scope.basicSearchOptions),
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status) {
      $('.progress-bar').css('width', 100 + '%').attr('aria-valuenow', 100);
      $scope.temp = data.content;
      if ($scope.temp.rows.length === 0) {
        $scope.listResult = false;
      } else {
        $('#no-results').hide();
        $scope.temp.headers.unshift('Date of Rate');
        $scope.temp.headers.unshift('Deposit Name');
        // change value bring from data base to let round it
        for (var i = 0; i < $scope.temp.rows.length; i++){
          $scope.temp.rows[i].rateBand = $scope.splitNumber($scope.temp.rows[i].rateBand);
          $scope.temp.rows[i].dateOfRate = $scope.splitDate($scope.temp.rows[i].dateOfRate);
        }
        $scope.depositResults = $scope.temp;
        $scope.listResult = true;
      }
    }).error(function (data, status) {
      $scope.listResult = false;
    }).then(function (data, status){
      $('#loading').empty();
      if (!$scope.listResult) {
        $('#results').load("./no-result.html");
      }
    });
  }

  //*****ENDS FUNCTIONS*****
  // Document Ready
  angular.element(document).ready(function () {
    // tooltip button action
    $(document).on('mouseenter','[data-toggle="tooltip"]', function(){
        $(this).tooltip('show');
    });
    $(document).on('mouseleave','[data-toggle="tooltip"]', function(){
        $(this).tooltip('hide');
    });

    // Bootstrap DatePicker
    $('.datepicker').datepicker({
      orientation: "top auto",
      todayHighlight: true,
      startDate: '0d'
    });
  });
}]);
