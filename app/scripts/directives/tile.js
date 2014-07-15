'use strict';

angular.module('ngMinesweeperAppInternal')
  .directive('tile', function () {
    return {
//      templateUrl: 'views/tile.html',
      template:  '<div class="tile" ng-class="{discovered: isDiscovered(), marked: isMarked(), mined: isMined()}" ng-click="reveal()" right-click="toggle()"><span>{{tile.value}}</span></div>',
      restrict: 'E',
      replace: true,
      scope: {
        x: '@',
        y: '@',
        tile: '=',
        grid: '='
      },

      link: function (scope) {

        var x = parseInt(scope.x, 10);
        var y = parseInt(scope.y, 10);

        scope.isDiscovered = function () {
          return scope.tile.discovered;
        };

        scope.isMarked = function () {
          return scope.tile.marked;
        };

        scope.isMined = function () {
          return scope.tile.mine && scope.isDiscovered();
        };

        scope.reveal = function () {
          scope.grid.reveal(x, y);
        };

        scope.toggle = function () {
          scope.grid.toggle(x, y);
        };
      }
    };
  });
