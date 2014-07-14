'use strict';

angular.module('ngMinesweeperAppInternal')
  .factory('Grid', function () {

    var Grid = function (width, height, amount) {

      this.width = width;
      this.height = height;
      this.numMines = amount;
      this.numMarked = 0;

      /*jshint ignore:start */
      /**
       * Two dimensional array of objects that represent
       * the board game. Each tile is an object that keeps
       * value of the tile: -1 if undiscovered,
       * mine: true/false whether a tile contains a mine
       * marked: true/false whether user marked a tile
       * @type {*|Array|U[]}
       */
      this.board = Array.apply(null, Array(width)).map(function () {
        return Array.apply(null, Array(height)).map(function () {
          return {
            value: -1,
            mine: false,
            marked: false
          };
        });
      });
      /*jshint ignore:end */

      // populate mines randomly
      var temp = 0;

      // we need to find the bigger one to avoid to access undefined member in array
      while (temp < this.numMines) {
        var xindex = this._getRandomInt(this.width);
        var yindex = this._getRandomInt(this.height);
        if (!this.board[xindex][yindex].mine) {
          this.board[xindex][yindex].mine = true;
          temp += 1;
        }
      }
    };


    /**
     * A helper function that return a random number from 0
     * up to given max number including
     * @param {number} max
     * @returns {number}
     * @private
     */
    Grid.prototype._getRandomInt = function (max) {
      return Math.floor(Math.random() * max);
    };

    /**
     * A helper function that calculates the minx, miny, maxx, and maxy
     * of a bounding box of a particular tile
     * @param {number} x
     * @param {number} y
     * @returns {{minx: number, miny: number, maxx: *, maxy: *}}
     * @private
     */
    Grid.prototype._calculateBBox = function (x, y) {
      // Don't check outside the edges of the board
      return {
        minx: (x <= 0 ? 0 : x - 1),
        miny: (y <= 0 ? 0 : y - 1),
        maxx: (x >= this.width - 1 ? this.width : x + 2),
        maxy: (y >= this.height - 1 ? this.height : y + 2)
      };
    };

    /**
     * Returns the number of mines that
     * surrounds and given tile
     * @param {number} x
     * @param  {number} y
     * @returns {number}
     * @private
     */
    Grid.prototype._closeMines = function (x, y) {
      var result = 0,
          bbox = this._calculateBBox(x, y);
      for (var i = bbox.minx; i < bbox.maxx; i += 1) {
        for (var j = bbox.miny; j < bbox.maxy; j += 1) {
          if (this.board[i][j].mine) { result += 1; }
        }
      }
      return result;
    };

    /**
     * Should set the correct value of the tile
     * @param {number} x
     * @param {number} y
     */
    Grid.prototype.reveal = function (x, y) {
      var tile = this.board[x][y];
      if (tile.value !== -1) {
        return;
      }
      if (tile.mine) {
        tile.value = null;
        tile.marked = true;
        return;
      }
      tile.value = this._closeMines(x, y);
      tile.marked = true;
      if (tile.value === 0) {
        this.revealMore(x, y);
      }
    };

    Grid.prototype.revealMore = function (x, y) {
      var bbox = this._calculateBBox(x, y);
      // Loop over all surrounding cells
      for (var i = bbox.minx; i < bbox.maxx; i += 1) {
        for (var j = bbox.miny; j < bbox.maxy; j += 1) {
          if (!this.board[i][j].mine && this.board[i][j].value === -1) {
            this.reveal(i, j);
            if (this.board[i][j].value === 0) {
              // Call ourself recursively
              this.revealMore(i, j);
            }
          }
        }
      }
    };

    /**
     * It toggles a tile at coordinates
     * x and y either in status marked or
     * unmarked
     * @param {number} x
     * @param {number} y
     */
    Grid.prototype.toggle = function (x, y) {
      var tile = this.board[x][y];
      if (tile.marked) {
        tile.marked = false;
        tile.value = -1;
        this.numMarked -= 1;
      } else {
        if (this.numMines - this.numMarked) {
          tile.marked = true;
          this.numMarked += 1;
        }
      }
    };

    return Grid;
  });
