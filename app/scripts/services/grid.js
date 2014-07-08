'use strict';

angular.module('ngMinesweeperAppInternal')
  .constant('tileState', {
    UNKNOWN: -1,
    MARKED: -2,
    MINE: -3
  })
  .factory('Grid', function (tileState) {

    function getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var Grid = function (width, height, amount) {

      this.width = width;
      this.height = height;
      this.numMines = amount;
      this.numMarked = 0;

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
      var index;
      while (temp < this.numMines) {
        index = getRandomInt(min, max);
        if (!this.mines[Math.floor(index / this.width)][index % this.height]) {
          this.mines[Math.floor(index / this.width)][index % this.height] = true;
        }
        temp += 1;
      }

    };


    return Grid;
  });
