'use strict';

angular.module('ngMinesweeperAppInternal')
  .factory('getRandomInt', function () {
    return function (max) {
      return Math.floor(Math.random() * max);
    };
  })
  .factory('Grid', function (getRandomInt) {

    var Grid = function (width, height, amount) {

      function calculateBBox(x, y) {
        // Don't check outside the edges of the board
        return {
          minx: (x <= 0 ? 0 : x - 1),
          miny: (y <= 0 ? 0 : y - 1),
          maxx: (x >= width - 1 ? width : x + 2),
          maxy: (y >= height - 1 ? height : y + 2)
        };
      }

      function getCloseMines(x, y, board) {
        var result = 0,
            bbox = calculateBBox(x, y);
        for (var i = bbox.minx; i < bbox.maxx; i += 1) {
          for (var j = bbox.miny; j < bbox.maxy; j += 1) {
            if (board[i][j].mine) { result += 1; }
          }
        }
        return result;
      }

      this.width = width;
      this.height = height;
      this.numMines = amount;
      this.numMarked = 0;

      /*jshint ignore:start */
      this.board = Array.apply(null, Array(width)).map(function () {
        return Array.apply(null, Array(height)).map(function () {
          return {
            value: void 0,
            mine: false,
            marked: false,
            discovered: false
          };
        });
      });
      /*jshint ignore:end */

      // populate mines randomly
      var temp = 0;

      while (temp < this.numMines) {

        var xindex = getRandomInt(this.width);
        var yindex = getRandomInt(this.height);
        if (!this.board[xindex][yindex].mine) {
          this.board[xindex][yindex].mine = true;
          temp += 1;
        }
      }

      this.reveal = function (x, y) {
        var tile = this.board[x][y];
        if (tile.marked || tile.discovered) {
          return;
        }
        if (tile.mine) {
          tile.value = 'Boom!';
          tile.discovered = true;
          return;
        }
        tile.value = getCloseMines(x, y, this.board);
        tile.discovered = true;
        if (tile.value === 0) {
          this.revealMore(x, y);
        }
      };

      this.revealMore = function (x, y) {
        var bbox = calculateBBox(x, y);
        // Loop over all surrounding cells
        for (var i = bbox.minx; i < bbox.maxx; i += 1) {
          for (var j = bbox.miny; j < bbox.maxy; j += 1) {
            if (!this.board[i][j].mine && !this.board[i][j].discovered) {
              this.reveal(i, j);
              if (this.board[i][j].value === 0) {
                // Call ourself recursively
                this.revealMore(i, j);
              }
            }
          }
        }
      };

      this.toggle = function (x, y) {
        var tile = this.board[x][y];
        if (tile.marked) {
          tile.marked = false;
          this.numMarked -= 1;
        } else {
          if (this.numMines > this.numMarked) {
            tile.marked = true;
            this.numMarked += 1;
          }
        }
      };
    };

    return Grid;
  });
