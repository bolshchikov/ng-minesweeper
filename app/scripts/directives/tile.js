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

        var x = parseInt(scope.x, 10);
        var y = parseInt(scope.y, 10);

        if (scope.grid.board[x][y] < 0) {
          element.find('.tile-content').hide();
        }
        else {
          element.find('.tile-content').show();
        }

        scope.reveal = function () {
          if (scope.grid.board[x][y] >= 0) {
            return;
          }
          var res = scope.grid.reveal(x, y);
          if (res === tileState.MINE) {
            element.find('.tile').toggleClass('mined');
          }
          else {
            element.find('.tile').toggleClass('discovered');
            element.find('.tile-content').show();
          }
        };
        scope.toggle = function () {
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
