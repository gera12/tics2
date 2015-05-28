'use strict';

angular.module('bibliotecaApp')
  .controller('MainCtrl', function ($scope, $http, socket,User,Auth) {
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
     $scope.cat = [

   
    {
      'categoria': 'Libro'
      
    },
    {
      'categoria': 'CD/DVD'
      
    },
    {
      'categoria' : 'Hardware'

    }
    ];
    

    $http.get('/api/users/me')
        .success(function(users) {
      $scope.users=users.prestamos;
      console.log(users.prestamos);
      socket.syncUpdates('user', $scope.users);
      
    });



   
  });
