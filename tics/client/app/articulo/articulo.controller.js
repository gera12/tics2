'use strict';

angular.module('bibliotecaApp')
  .controller('ArticuloCtrl', function ($scope, $http, socket, $location, Auth, User) {
    $scope.message = 'Hello';
    $scope.articulos = [];
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.articulo = {};
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
    $scope.prestamo = [];
//    $scope.users = User.query();

    console.log(User.query());
    console.log($scope.getCurrentUser());





    $http.get('api/articulos')
    	.success(function(articulos){
    		$scope.articulos = articulos;
    		console.log($scope.articulos);
    		socket.syncUpdates('articulo', $scope.articulos);
    	});

    $scope.addarticulo = function(algo){
    	console.log(algo);
    	$http.post('api/articulos',algo)
    		.success(function(data){
    			console.log(data);
    		});
      };
    $scope.isActive = function(route) {
      return route === $location.path();
    };



    $scope.getArticulo = function(cosa){



     

      var estado = false;
      $http.post('api/articulos/' + cosa._id ,estado)
        .success(function(data){
          console.log('hola')
          console.log(data);
        });
      $http.post('api/users/addbook',cosa)
        .success(function(data){
         console.log(data);
        });        

        
      




       



      //console.info($scope.prestamo);

    };



    $scope.deletearticulo = function(articulo){
     // console.log('libro');
      //console.log(libro);
     $http.delete('api/articulos/' + articulo._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('articulo');
    });

  });

