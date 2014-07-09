'use strict';

angular.module('ngMinesweeperAppInternal')
  .controller('MainCtrl', function (Grid) {
    this.generate = function (width, height, amount) {
      this.grid = new Grid(parseInt(width, 10), parseInt(height, 10), parseInt(amount, 10));
    };
  });

