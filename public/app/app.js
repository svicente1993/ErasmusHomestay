var retailBankingApp = angular.module('retailBankingApp',
                                      ['ui.router','ui.multiselect',
                                       'mortgageSearchController',
                                       'mortgageDetailsController',
                                       'depositSearchController',
                                       'depositDetailsController',
                                       'reportController',
                                       'mortgageComparisonController',
                                       'depositComparisonController']);
retailBankingApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: './app/components/home/homeView.html'
  })
  .state('mortgage', {
    url: '/mortgage',
    templateUrl: './app/components/mortgage/index.html',
    views: { "" : {templateUrl: './app/components/mortgage/index.html'},
      "search@mortgage": { templateUrl: "./app/components/mortgage/search.html",
                            controller: "MortgageSearchController"}
    }
  })
  .state('mortgagecomparison', {
    url: "/mortgage/comparison",
    params: {
      searchData: null,
      ids: null
    },
    templateUrl: './app/components/mortgageComparison/mortgageComparisonView.html',
    controller: 'MortgageComparisonController'
  })
  .state('mortgagedetails', {
    url: "/mortgage/details/{productId}",
    templateUrl: './app/components/mortgage/details.html',
    controller: 'MortgageDetailsController'
  })
  .state('deposit', {
    url: '/deposit',
    templateUrl: './app/components/deposit/index.html',
    views: { "" : { templateUrl: './app/components/deposit/index.html' },
      "search@deposit": { templateUrl: "./app/components/deposit/search.html",
                            controller: "DepositSearchController"}
    }
  })
  .state('depositdetails', {
    url: '/deposit/details/{depositId}',
    templateUrl: './app/components/deposit/details.html',
    controller: 'DepositDetailsController'
  })
  .state('depositcomparison', {
    url: "/deposit/comparison",
    params: {
      ids: null,
      depositSearchData: null
    },
    templateUrl: './app/components/depositComparison/depositComparisonView.html',
    controller: 'DepositComparisonController'
  })
  .state('report', {
    url: '/report',
    templateUrl: './app/components/report/index.html',
    views: { "" : { templateUrl: './app/components/report/index.html' },
      "reports@report": { templateUrl: "./app/components/report/reports.html",
                          controller: "ReportController"}
    }
  })
});

retailBankingApp.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key) {
      return $window.localStorage[key] || 0;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    delete: function(key){
      $window.localStorage[key] = 0;
    },
    deleteObject: function(key){
      $window.localStorage[key] = '{}';
    }
  }
}]);

retailBankingApp.directive('showErrors', function ($timeout) {
  return {
    restrict: 'A',
    require:  '^form',
    link: function (scope, el, attrs, formCtrl) {

      // find the text box elements
      var inputEl   = el[0].querySelector("[name]");
      // convert the native text box element to an angular element
      var inputNgEl = angular.element(inputEl);
      var inputName = inputNgEl.attr('name');

      var blurred = false;
      inputNgEl.bind('blur keyup', function() {
        blurred = true;
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        })

        scope.$watch(function() {
          return formCtrl[inputName].$invalid
        }, function(invalid) {
          // we only want to toggle the has-error class after the blur
          // event or if the control becomes valid
          if (!blurred && invalid) { return }
          el.toggleClass('has-error', invalid);
        });

        scope.$on('show-errors-check-validity', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        });

    }
  }
});

retailBankingApp.directive('lowerThan', [
  function() {

    var link = function($scope, $element, $attrs, ctrl) {

      var validate = function(viewValue) {
        var comparisonModel = $attrs.lowerThan;
        // It's valid if model is lower than the model we're comparing against
        ctrl.$setValidity('lowerThan', parseFloat(viewValue, 10) <= parseFloat(comparisonModel, 10));
        return viewValue;
      };
      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);

      $attrs.$observe('lowerThan', function(comparisonModel){
        return validate(ctrl.$viewValue);
      });
    };
    return {
      require: 'ngModel',
      link: link
    };
  }
]);

retailBankingApp.directive('greaterThan', [
  function() {

    var link = function($scope, $element, $attrs, ctrl) {

      var validate = function(viewValue) {
        var comparisonModel = $attrs.greaterThan;
        // It's valid if model is lower than the model we're comparing against
        ctrl.$setValidity('greaterThan', parseFloat(viewValue, 2) >= parseFloat(comparisonModel, 2));
        return viewValue;
      };
      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);

      $attrs.$observe('greaterThan', function(comparisonModel){
        return validate(ctrl.$viewValue);
      });
    };
    return {
      require: 'ngModel',
      link: link
    };
  }
]);
