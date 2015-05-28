'use strict';

angular.module('bibliotecaApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    

    $scope.delete = function(user) {

      User.remove({ id: user._id });
     
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {

          $scope.users.splice(i, 1);
        }
      });
    };


    $scope.delete = function(articulo) {
      User.deleteBook({ id: articulo._id });
     
      angular.forEach($scope.users, function(u, i) {
        if (u === articulo) {
         //delete
        }
      });
    };


  });

