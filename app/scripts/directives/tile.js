'use strict';

angular.module('ngMinesweeperAppInternal')
  .directive('tile', function (tileState) {
    return {
//      templateUrl: 'views/tile.html',
      template:  '<div class="tile" ng-class="{discovered: isDiscovered(), marked: isMarked(), mined: isMined()}" ng-click="reveal()" right-click="toggle()"><span ng-if="isDiscovered()">{{value ? value : \'\'}}</span></div>',
      restrict: 'E',
      scope: {
        x: '@',
        y: '@',
        value: '=',
        grid: '='
      },

      link: function (scope) {

        var x = parseInt(scope.x, 10);
        var y = parseInt(scope.y, 10);

        scope.isDiscovered = function () {
          return scope.value >= 0;
        };

        scope.isMarked = function () {
          return scope.value === tileState.MARKED;
        };

        scope.isMined = function () {
          return scope.value === tileState.MINE;
        };

        scope.reveal = function () {
          if (scope.grid.board[x][y] >= 0) {
            return;
          }
          var res = scope.grid.reveal(x, y);
          if (res === 0) {
            scope.grid.revealMore(x, y);
          }
        };

        scope.toggle = function () {
          if (scope.grid.board[x][y] === tileState.UNKNOWN) {
            scope.grid.mark(x, y);
            return;
          }
          if (scope.grid.board[x][y] === tileState.MARKED) {
            scope.grid.unmark(x, y);
            return;
          }
        };
      }
    };
  });
