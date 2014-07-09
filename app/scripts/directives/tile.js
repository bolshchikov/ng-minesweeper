'use strict';

angular.module('ngMinesweeperAppInternal')
  .directive('tile', function (tileState) {
    return {
      templateUrl: 'views/tile.html',
      restrict: 'EA',
      transclude: true,
      scope: {
        x: '@',
        y: '@',
        grid: '='
      },
      link: function (scope, element) {
        scope.reveal = function () {
          var res = scope.grid.reveal(parseInt(scope.x, 10), parseInt(scope.y, 10));
          if (res === tileState.MINE) {
            element.find('.tile').toggleClass('mined');
          }
          else {
            element.find('.tile').toggleClass('discovered');
          }
        };
        scope.toggle = function () {
          var x = parseInt(scope.x, 10);
          var y = parseInt(scope.y, 10);
          if (scope.grid.board[x][y] === tileState.UNKNOWN) {
            element.find('.tile').toggleClass('marked');
            scope.grid.mark(x, y);
            return;
          }
          if (scope.grid.board[x][y] === tileState.MARKED) {
            element.find('.tile').toggleClass('marked');
            scope.grid.unmark(x, y);
            return;
          }
        };
      }
    };
  });
