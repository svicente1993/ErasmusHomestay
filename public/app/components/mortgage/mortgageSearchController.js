var mortgageSearchController = angular.module('mortgageSearchController', []);

mortgageSearchController.controller('MortgageSearchController',
  ['$scope','$http','$state','$localStorage',
    function($scope, $http, $state, $localStorage)
{
    $scope.CheckBoxModel = {Master : false};
    $scope.basicSearchOptions = {};
    $scope.idsChecked = [];
    var loadingList = { loanList: false, buyerList: false,
                        businessList: false, termList: false,
                        providerList: false, mortgageTypeList: false,
                        fixedList: false, reportList: false }

    function onLoaded(listName){
      loadingList[listName] = true;
      if(loadingList.loanList &&
         loadingList.buyerList &&
         loadingList.businessList &&
         loadingList.termList &&
         loadingList.providerList &&
         loadingList.mortgageTypeList &&
         loadingList.fixedList &&
         loadingList.reportList){
           onAllCompleted();
         }
    }

    function onAllCompleted() {
      var obj = $localStorage.getObject('mortgageSearchOptions');
      if (obj !== 0){
        $scope.PropertyType = obj.basic.propertyType;
        $scope.BusinessType = obj.basic.businessType;
        $scope.inputLTV = obj.basic.ltv;
        $scope.inputLoan = obj.basic.loanAmount;
        $scope.BuyerType = obj.basic.buyerType;
        $scope.Term = obj.basic.loanTerm;
        $scope.inputPropertyPrice = obj.basic.propertyPrice;
        $scope.StartDate = obj.basic.loanStartDateString;
        if(obj.advanced !== null){
          if ($('#advanced-search').hasClass('hide'))
            $scope.showAdvSearch();

          $scope.BankCompany = $localStorage.getObject('mortgageProvider');
          $scope.MortgageType = $localStorage.getObject('mortgageType');
          $scope.FixedPeriod = $localStorage.getObject('fixedPeriod');
          $scope.ReportOptions = $localStorage.getObject('reportOptions');
        }
        $scope.basicSearchOptions = obj;
        sendSearch();
        $localStorage.delete('mortgageSearchOptions');
        $localStorage.delete('mortgageProvider');
        $localStorage.delete('mortgageType');
        $localStorage.delete('fixedPeriod');
        $localStorage.delete('reportOptions');
      }
    }

    // Resources collected of API

    // PropertyType
    $http.get(window.serviceUrl + 'api/propertytype').
    success(function (data) {
      $scope.propertyTypes = data.content;
      onLoaded('loanList');
    }).
    error(function(data, status) {
      myAlert('Please, reload this page because the data are failed');
    });

    // BuyerType
    $http.get(window.serviceUrl + 'api/buyertype').
    success(function (data) {
      $scope.buyerTypes = data.content;
      onLoaded('buyerList');
    }).
    error(function(data, status) {
      myAlert('Please, reload this page because the data are failed');
    });

    // BusinessType
    $http.get(window.serviceUrl + 'api/businesstype').
    success(function (data) {
      $scope.businessTypes = data.content;
      onLoaded('businessList');
    }).
    error(function(data, status) {
      myAlert('Please, reload this page because the data are failed');
    });

    // Term
    $scope.terms = [{'id': 0, 'name': 'All'},
                    {'id': 1, 'name': '1 year'}];
    for(var i = 2; i < 41; i++){
      $scope.terms.push({'id': i, 'name': i+' years'});
    }
    onLoaded('termList');

    // BankCompany
    $http.get(window.serviceUrl + 'api/bankcompany').
    success(function (data) {
      $scope.bankCompanies = data.content;
      onLoaded('providerList');
    }).
    error(function(data, status) {
      myAlert('Please, reload this page because the data are failed');
    });

    // MortgageType
    $http.get(window.serviceUrl + 'api/mortgagetype').
    success(function (data) {
      $scope.mortgageTypes = data.content;
      onLoaded('mortgageTypeList');
    }).
    error(function(data, status) {
      myAlert('Please, reload this page because the data are failed');
    });

    // FixedPeriod
    $http.get(window.serviceUrl + 'api/fixedperiod').
    success(function (data) {
      $scope.fixedPeriods = data.content;
      onLoaded('fixedList');
    }).
    error(function(data, status) {
      myAlert('Please, reload this page because the data are failed');
    });

    //Report Options
    $http.get(window.serviceUrl + 'api/mortgagesearchreportoptions').
    success(function (data) {
      $scope.reportOptions = data.content;
      onLoaded('reportList');
    }).
    error(function(data, status) {
      myAlert('Please, reload this page because the data are failed');
    });

    // Document Ready
    angular.element(document).ready(function(){

    // Convert to Special Calendar an input
    $('.datepicker').datepicker({
      format: "yyyy/mm/dd",
      minViewMode: 1,
      orientation: "top auto",
      daysOfWeekDisabled: "0,6"
    });
    // tooltip button action
    $(document).on('mouseenter','[data-toggle="tooltip"]', function(){
        $(this).tooltip('show');
    });
    $(document).on('mouseleave','[data-toggle="tooltip"]', function(){
        $(this).tooltip('hide');
    });

  });
  // End to Document Ready

  //***** Functions

  $scope.saveIds = function(id){
    $scope.CheckBoxModel.Master = false;
    if ($scope.idsChecked.indexOf(id) === -1)
      $scope.idsChecked.push(id);
    else
      $scope.idsChecked.splice($scope.idsChecked.indexOf(id), 1);
    if($scope.idsChecked.length >= 2)
      $('.btn-no-action').removeClass('disabled');
    else
      $('.btn-no-action').addClass('disabled');

  }

  // get all ids to compare
  $scope.getAllIds = function() {
    $scope.idsChecked = [];
    if ($scope.CheckBoxModel.Master){
      $('.check-result').prop('checked', true);
      angular.forEach($scope.temp.rows, function(value, key){
        $scope.idsChecked.push(value.mortgageId.productId);
      });
    }else
      $('.check-result').prop('checked', false);
    if($scope.idsChecked.length >= 2)
      $('.btn-no-action').removeClass('disabled');
    else
      $('.btn-no-action').addClass('disabled');
  }

  $scope.checkIds = function(id){

    if(id.length >= 2){
      $state.go('mortgagecomparison', {searchData: $scope.basicSearchOptions, ids: id})
      $localStorage.setObject('mortgageSearchOptions', $scope.basicSearchOptions);
      if ($scope.BankCompany != undefined){
        $localStorage.setObject('mortgageProvider', $scope.BankCompany);
      }
      if ($scope.MortgageType != undefined){
        $localStorage.setObject('mortgageType', $scope.MortgageType);
      }
      if ($scope.FixedPeriod != undefined){
        $localStorage.setObject('fixedPeriod', $scope.FixedPeriod);
      }
      if ($scope.ReportOptions != undefined){
        $localStorage.setObject('reportOptions', $scope.ReportOptions);
      }
    }
  }

  $scope.sendAdvancedSearch = function(){
    $scope.idsChecked = [];
    $scope.CheckBoxModel.Master = false;
    $scope.listResult = false;
    $scope.listResultIE = false;
    if ($scope.PropertyType === undefined || $scope.PropertyType === '' ||
        $scope.BuyerType === undefined || $scope.BuyerType === '' ||
        $scope.BusinessType === undefined || $scope.BusinessType == '' ||
        $scope.Term === undefined || $scope.Term == '') {
      myAlert('Be sure that you fill out the form');
      if ($("#alert-top-mortgage").hasClass("hide")) {
        $('#alert-top-mortgage').toggleClass('hide');
      }
    } else {
      if (!$("#alert-top-mortgage").hasClass("hide")) {
        $('#alert-top-mortgage').toggleClass('hide');
      }
      $scope.$broadcast('show-errors-check-validity');
      // If the form is valid
      if ($scope.mortgageForm.$valid) {
        // Inject load tool
        $('#loading').load("./load.html");
        $('#progress-bar').css('width', 25+'%').attr('aria-valuenow',25);
        // Get data from form
        $scope.basicSearchOptions = {
          basic : {
            loanAmount : parseFloat($scope.inputLoan, 2),
            propertyPrice : parseFloat($scope.inputPropertyPrice, 2),
            ltv : parseFloat($scope.inputLTV, 2),
            propertyType : $scope.PropertyType,
            buyerType : $scope.BuyerType,
            loanStartDateString : $scope.StartDate,
            businessType : $scope.BusinessType,
            loanTerm : $scope.Term,
            loanStartDate : new Date($scope.StartDate).getTime()
          },
          advanced : null
        };
        $('#progress-bar').css('width', 50+'%').attr('aria-valuenow',50);

        // Handle advanced search
        if (!$scope.isBasicSearch()){
          $scope.mortgageProv = [];
          $scope.mortgageTyp = [];
          $scope.mortgageFix = [];
          $scope.reportOpt = []
          // Get data from inputs
          $scope.getAdvancedValues();
          // Update of json to send
          $scope.basicSearchOptions.advanced = {
            mortgageProvider : $scope.mortgageProv,
            mortgageType : $scope.mortgageTyp,
            mortgageFixedPeriod : $scope.mortgageFix,
            reportOption : $scope.reportOpt}
          };
        $('#progress-bar').css('width', 75+'%').attr('aria-valuenow',75);
        sendSearch();
      }
    }
  }

  var sendSearch = function(){
    $http({
      url: window.serviceUrl + 'api/mortgagesearch',
      method: 'POST',
      data: JSON.stringify($scope.basicSearchOptions),
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status) {
      $('#progress-bar').css('width', 100+'%').attr('aria-valuenow',100);
      $scope.temp = data.content;
      // condition results
      if ($scope.temp.rows.length === 0){
        $scope.listResult = false;
      }else{
        $('#no-results').hide();
        $scope.temp.headers.unshift('Mortgage Name');
        $scope.mortgageResults = $scope.temp;
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

  $scope.getAdvancedValues = function(){
    if (!($scope.BankCompany === undefined || $scope.BankCompany.length === 0)){
      for (i in $scope.BankCompany){
        $scope.mortgageProv.push($scope.BankCompany[i].companyId)
      }
    }
    if (!($scope.MortgageType === undefined || $scope.MortgageType.length === 0)){
      for (i in $scope.MortgageType){
        $scope.mortgageTyp.push($scope.MortgageType[i].mortgageTypeId)
      }
    }
    if (!($scope.FixedPeriod === undefined || $scope.FixedPeriod.length === 0)){
      for (i in $scope.FixedPeriod){
        $scope.mortgageFix.push($scope.FixedPeriod[i].numberOfMonths)
      }
    }
    if (!($scope.ReportOptions === undefined || $scope.ReportOptions.length === 0)){
      for (i in $scope.ReportOptions){
        $scope.reportOpt.push($scope.ReportOptions[i].name.replace(/ /g,''));
      }
    }
  }

  $scope.downloadReport = function(){
    console.log('Download!');
  }

  $scope.saveReport = function(){
    console.log('Save!');
  }

  $scope.toPDF = function(e){
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden'));
    form.attr('action', window.serviceUrl+ 'pdf/MortgageSearchPDF');

    fillFormHidden(form);
    form.submit();
  }

  $scope.exportDetailsToPDF = function(id){
    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden'));
    form.attr('action', window.serviceUrl+ 'pdf/MortgageDetailsPDF');
    /* ID */
    form.append('<input type="hidden" name="id" value="' + id +'" />');
    form.submit();
  }

  $scope.toCSV = function(e){

    $('input[type="hidden"]').remove();
    var form = ($('#form-hidden'));
    form.attr('action', window.serviceUrl+ 'excel/MortgageSearchExcel');

    fillFormHidden(form);
    form.submit();
  }

  var fillFormHidden = function(form){
    /* IDS */
    for(var i = 0; i < $scope.idsChecked.length; i++){
      form.append('<input type="hidden" name="ids" value="'+$scope.idsChecked[i]+'" />');
    }

    /* Basic */
    form.append('<input type="hidden" name="basic.loanAmount" value="'+$scope.basicSearchOptions.basic.loanAmount+'" />');
    form.append('<input type="hidden" name="basic.propertyPrice" value="'+$scope.basicSearchOptions.basic.propertyPrice+'" />');
    form.append('<input type="hidden" name="basic.propertyType" value="'+$scope.basicSearchOptions.basic.propertyType+'" />');
    form.append('<input type="hidden" name="basic.buyerType" value="'+$scope.basicSearchOptions.basic.buyerType+'" />');
    form.append('<input type="hidden" name="basic.businessType" value="'+$scope.basicSearchOptions.basic.businessType+'" />');
    form.append('<input type="hidden" name="basic.loanTerm" value="'+$scope.basicSearchOptions.basic.loanTerm+'" />');
    form.append('<input type="hidden" name="basic.loanStartDate" value="'+$scope.basicSearchOptions.basic.loanStartDate+'" />');

    /* Advanced */
    if($scope.basicSearchOptions.advanced !== null){

      if($scope.basicSearchOptions.advanced.mortgageProvider.length > 0){
        for(var i = 0; i < $scope.basicSearchOptions.advanced.mortgageProvider.length; i++){
          form.append('<input type="hidden" name="advanced.mortgageProvider" value="'+$scope.basicSearchOptions.advanced.mortgageProvider[i]+'" />');
        }
      }

      if($scope.basicSearchOptions.advanced.mortgageType.length > 0){
        for(var i = 0; i < $scope.basicSearchOptions.advanced.mortgageType.length; i++){
          form.append('<input type="hidden" name="advanced.mortgageType" value="'+$scope.basicSearchOptions.advanced.mortgageType[i]+'" />');
        }
      }


      if($scope.basicSearchOptions.advanced.mortgageFixedPeriod.length > 0){
        for(var i = 0; i < $scope.basicSearchOptions.advanced.mortgageFixedPeriod.length; i++){
          form.append('<input type="hidden" name="advanced.mortgageFixedPeriod" value="'+$scope.basicSearchOptions.advanced.mortgageFixedPeriod[i]+'" />');
        }
      }

      if($scope.basicSearchOptions.advanced.reportOption.length > 0){
        for(var i = 0; i < $scope.basicSearchOptions.advanced.reportOption.length; i++){
          form.append('<input type="hidden" name="advanced.reportOption" value="'+$scope.basicSearchOptions.advanced.reportOption[i]+'" />');
        }
      }
    }
  }


  $scope.showAdvSearch = function(){
    $('#advanced-search').toggleClass('hide');
    $('.i-search i').toggleClass('glyphicon-eye-open glyphicon-eye-close');
  }

  $scope.seeDetails = function(num){
    var url = $state.href('mortgagedetails', {productId: num});
    window.open(url, '_blank');
  }

  $scope.isBasicSearch = function(){
    if (($scope.BankCompany === undefined || $scope.BankCompany.length === 0) &&
      ($scope.MortgageType === undefined || $scope.MortgageType.length === 0) &&
      ($scope.FixedPeriod === undefined || $scope.FixedPeriod.length === 0) &&
      ($scope.ReportOptions === undefined || $scope.ReportOptions.length === 0)){
        return true
    }else{
        return false;
    }
  }

    $scope.autoCalculate = function(item, position){
      var lstInputs = $('.input-operation').filter(function(){
        return !$(this).val();
      }).length;
      if ($scope.inputLoan === ''){
        $scope.inputLoan = undefined;
      }
      if ($scope.inputPropertyPrice === ''){
        $scope.inputPropertyPrice = undefined;
      }
      if ($scope.inputLTV === ''){
        $scope.inputLTV = undefined;
      }

      if (lstInputs <= 1 &&
        parseFloat($scope.inputPropertyPrice) > 0 &&
        parseFloat($scope.inputLoan) <= parseFloat($scope.inputPropertyPrice)
      ){
        if(position === 1) {
          $scope.inputLTV = (parseFloat($scope.inputLoan) * 100 / parseFloat($scope.inputPropertyPrice)).toFixed(2);
        }
        if(position === 2) {
          if(position === 2 &&
            $scope.inputLoan === NaN
          ) {
            //TODO Nunca entra aqui, nunca es NaN
            $scope.inputLoan = (parseFloat($scope.inputLTV) * parseFloat($scope.inputPropertyPrice / 100)).toFixed(2);
          }else{
            $scope.inputLTV = (parseFloat($scope.inputLoan) * 100 / parseFloat($scope.inputPropertyPrice)).toFixed(2);
          }
        }
        if(position === 3 &&
          $scope.inputPropertyPrice !== undefined &&
          parseFloat($scope.inputLTV) <= 100 &&
          parseFloat($scope.inputLTV) >= 1) {
            $scope.inputLoan = (parseFloat($scope.inputLTV) * parseFloat($scope.inputPropertyPrice / 100)).toFixed(2);
          }
        }else if(lstInputs <= 1 &&
          parseFloat($scope.inputPropertyPrice) > 0 &&
          isNaN(parseFloat($scope.inputLoan))&&
          parseFloat($scope.inputLTV) <= 100 &&
          parseFloat($scope.inputLTV) >= 1) {
            if (position == 2 || position == 3){
              $scope.inputLoan = (parseFloat($scope.inputLTV) * parseFloat($scope.inputPropertyPrice / 100)).toFixed(2);
            }
          }else{
            var lstInputs = $('.input-operation').filter(function(){
              if(!$(this).val()){
                //console.log('te falta rellenar: ' + $(this).data('name'));
              }
            }).length;
          }
        };
      }]);
