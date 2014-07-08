'use strict';

angular.module('ngMinesweeperAppInternal')
  .controller('MainCtrl', function (Grid) {
    this.generate = function (width, height, amount) {
      this.grid = new Grid(width, height, amount);
      console.log(this.grid);
    }
  });

