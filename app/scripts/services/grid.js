'use strict';

angular.module('ngMinesweeperAppInternal')
  .constant('tileState', {
    UNKNOWN: -1,
    MARKED: -2,
    MINE: -3
  })
  .factory('Grid', function (tileState) {

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var Grid = function (width, height, amount) {

      this.width = width;
      this.height = height;
      this.numMines = amount;
      this.numMarked = 0;
      this.numUnknown = this.width * this.height;

      /*jshint ignore:start */
      // create empty two-dimensional array for mines locations
      this.mines = Array.apply(null, Array(width)).map(function () {
        return Array.apply(null, Array(height)).map(function () {
          return false;
        });
      });
      // state of the grid how user sees it
      this.board = Array.apply(null, Array(width)).map(function () {
        return Array.apply(null, Array(height)).map(function () {
          return tileState.UNKNOWN;
        });
      });
      /*jshint ignore:end */

      // populate mines randomly
      var temp = 0;
      var min = 0;
      var max = this.width * this.height;
      var big;
      var small;
      var index;
      // we need to find the bigger one to avoid to access undefined member in array
      if (this.width >= this.height) {
        big = this.width;
        small = this.height;
      }
      else {
        big = this.height;
        small = this.width;
      }
      while (temp < this.numMines) {
        index = getRandomInt(min, max);
        if (!this.mines[Math.floor(index / big)][index % small]) {
          this.mines[Math.floor(index / big)][index % small] = true;
        }
        temp += 1;
      }

    };

    Grid.prototype.reveal = function (x, y) {
      if (this.board[x][y] === tileState.UNKNOWN) {
        this.numUnknown -= 1;
        if (this.mines[x][y]) {
          this.board[x][y] = tileState.MINE;
        }
        else {
          this.board[x][y] = this._closeMines(x, y);
//          this.revealMore(x, y);
        }
      }
      return this.board[x][y];
    };

    Grid.prototype.revealMore = function (x, y) {
      var minx, miny, maxx, maxy;
      // Don't try to check beyond the edges of the board...
      minx = (x <= 0 ? 0 : x - 1);
      miny = (y <= 0 ? 0 : y - 1);
      maxx = (x >= this.width - 1 ? this.width : x + 2);
      maxy = (y >= this.height - 1 ? this.height : y + 2);
      // Loop over all surrounding cells
      for (var i = minx; i < maxx; i += 1) {
        for (var j = miny; j < maxy; j += 1) {
          if (!this.mines[i][j] && this.board[i][j] === tileState.UNKNOWN) {
            this.reveal(i, j);
            if (this.board[i][j] === 0) {
              // Call ourself recursively
              this.revealMore(i, j);
            }
          }
        }
      }

    };

    Grid.prototype.mark = function (x, y) {
      if ((this.numMines - this.numMarked) > 0 && this.board[x][y] === tileState.UNKNOWN) {
        this.board[x][y] = tileState.MARKED;
        this.numMarked += 1;
        return true;
      }
      else {
        return false;
      }
    };

    Grid.prototype.unmark = function (x, y) {
      if (this.board[x][y] === tileState.MARKED) {
        this.board[x][y] = tileState.UNKNOWN;
        this.numMarked -= 1;
        return true;
      }
      else {
        return false;
      }
    };

    Grid.prototype._closeMines = function (x, y) {
      var minx, miny, maxx, maxy;
      var result = 0;

      // Don't check outside the edges of the board
      minx = (x <= 0 ? 0 : x - 1);
      miny = (y <= 0 ? 0 : y - 1);
      maxx = (x >= this.width - 1 ? this.width : x + 2);
      maxy = (y >= this.height - 1 ? this.height : y + 2);

      for (var i = minx; i < maxx; i += 1) {
        for (var j = miny; j < maxy; j += 1) {
          if (this.mines[i][j]) { result += 1; }
        }
      }
      return result;
    };


    return Grid;
  });
