'use strict';

angular.module('bibliotecaApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Articulos',
      'link': '/articulo'
    }
    ];

   
/*$scope.articulos=[{


      'title': 'Libro',
      'link': '/libro'
    },
    {
      'title': 'CD/DVD',
      'link': '/'
    },
{
      'title': 'Equipo de Hardware',
      'link': '/'
    }
];*/
    
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });