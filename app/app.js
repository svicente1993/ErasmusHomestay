var erasmusHomestayApp = angular.module('erasmusHomestayApp',
                                      ['ui.router',
                                       'homeController',
                                       'advertsController',
                                       'commentsController',
                                       'usersController']);

erasmusHomestayApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: './app/partials/home/home.html',
    controller: 'HomeController'
  })
  .state('adverts', {
    url: "/adverts/{country}",
    templateUrl: './app/partials/adverts/adverts.html',
    controller: 'AdvertsController'
  })
  .state('comments', {
    url: "/comments",
    templateUrl: './app/partials/comments/comments.html',
    controller: 'CommentsController'
  })
  .state('users', {
    url: "/users",
    templateUrl: './app/partials/users/users.html',
    controller: 'UsersController'
  })
});