'use strict';

angular.module('ngMinesweeperAppInternal')
  .directive('tile', function (tileState) {
    return {
      templateUrl: 'views/tile.html',
      restrict: 'EA',
      scope: {
        x: '@',
        y: '@',
        value: '@',
        grid: '='
      },

      link: function (scope, element) {

        var x = parseInt(scope.x, 10);
        var y = parseInt(scope.y, 10);

        scope.$watch('value', function (arg) {
          var value = parseInt(arg, 10);
          var tile = element.find('.tile');
          if (value === tileState.MINE) {
            tile.toggleClass('mined');
          }
          else if (value === tileState.MARKED) {
            tile.toggleClass('marked');
          }
          else if (value >= 0) {
            tile.toggleClass('discovered');
            tile.text(value);
          }
          else {
            tile.removeClass('discovered');
            tile.removeClass('marked');
            tile.removeClass('mined');
          }
        });

        scope.reveal = function () {
          if (scope.grid.board[x][y] >= 0) {
            return;
          }
          scope.grid.reveal(x, y);
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
