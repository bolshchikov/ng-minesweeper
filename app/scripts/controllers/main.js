'use strict';

angular.module('ngMinesweeperAppInternal')
  .constant('GameURL', {
    url: 'http://localhost:3000/game'
  })
  .controller('MainCtrl', function (Grid, GameURL, $http, $log) {

    var that = this;

    $http.get(GameURL.url)
      .success(function (res) {
        if (!res) { return; }
        var grid = new Grid(res.width, res.height, res.numMines);
        grid.numMarked = res.numMarked;
        grid.board = res.board;
        that.grid = grid;
      })
      .error(function () {
        $log.log('No save found');
      });

    this.generate = function (width, height, amount) {
      this.grid = new Grid(width, height, amount);
    };

    this.save = function () {
      $http.post(GameURL.url, this.grid)
        .success(function () {
          $log.log('game is saved');
        });
    };
  });

