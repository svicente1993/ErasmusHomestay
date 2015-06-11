var loginApp = angular.module('loginApp', ['ui.router']);

loginApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/")
  $stateProvider
  .state('/', {
    url: "",
    templateUrl: './app/components/login/loginView.html',
    controller:  'loginCtrl'
  })
});

loginApp.controller('loginCtrl', ['$scope', function($scope){
  // Document Ready
  angular.element(document).ready(function () {
    // Bootstrap ToolTip
    $('[data-toggle="tooltip"]').tooltip();
    // Botstrap PopOver
    $('#example').popover();
  });



  $scope.checkLogin = function() {
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.signinForm.$valid) {
      console.log('User saved');
    }
  };
}]);

loginApp.directive('showErrors', function ($timeout) {
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

loginApp.directive('passwordValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
                scope.pwdHasUpperLetter = (viewValue && /[A-Z]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasLowerLetter = (viewValue && /[a-z]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasSpecialCharacter = (viewValue && /[#?!@$%^&*-]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                if(scope.pwdValidLength && scope.pwdHasUpperLetter && scope.pwdHasLowerLetter
                      && scope.pwdHasSpecialCharacter && scope.pwdHasNumber) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);
                    return undefined;
                }

            });
        }
    };
});
