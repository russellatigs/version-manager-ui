var app = angular.module('myList', []);

app.controller('myCtrl', ['$scope', '$window', function($scope, $window) {
  $scope.greeting = 'Hola!';

}]);
