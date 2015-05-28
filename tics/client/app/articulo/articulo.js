'use strict';

angular.module('bibliotecaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('articulo', {
        url: '/articulo',
        templateUrl: 'app/articulo/articulo.html',
        controller: 'ArticuloCtrl'
      });
  });