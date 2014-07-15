'use strict';

describe('Service: Grid', function () {

  // load the service's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
    var i = 0;
    module({getRandomInt: function () {
      return i++;
    }});
  });

  // instantiate service
  var Grid;

  beforeEach(inject(function (_Grid_) {
    Grid = _Grid_;
  }));

  it('should return constructor', function () {
    expect(typeof Grid).toBe('function');
  });

  it('should have requires api', function () {
    var grid = new Grid(6, 6, 3);
    expect(Array.isArray(grid.board)).toBe(true);
    expect(typeof grid.reveal).toEqual('function');
    expect(typeof grid.toggle).toEqual('function');
  });

  it('should check the created board of the correct size', function () {
    var grid = new Grid(6, 6, 3);
    expect(grid.board.length).toEqual(6);
    grid.board.forEach(function (row) {
      expect(row.length).toEqual(6);
    });
  });

  it('should check the inital state of the board', function () {
    var grid = new Grid(6, 6, 3);
    grid.board.forEach(function (row) {
      row.forEach(function (tile) {
        expect(tile.marked).toBe(false);
        expect(tile.discovered).toBe(false);
        expect(tile.value).toEqual(void 0);
      });
    });
  });

  it('should check the correct amount of mines', function () {
    var grid = new Grid(6, 6, 3);
    var res = 0;
    grid.board.forEach(function (row) {
      row.forEach(function (tile) {
        if (tile.mine) { res += 1; }
      });
    });
    expect(res).toEqual(3);
  });

  it('should calculate the amount of mines around', function () {
    var grid = new Grid(6, 6, 3);
    grid.reveal(0, 0);
    expect(grid.board[0][0].value).toEqual(1);
  });

  it('marks a tile as discovered after reveal', function () {
    var grid = new Grid(6, 6, 3);
    grid.reveal(0, 0);
    expect(grid.board[0][0].discovered).toBe(true);
  });

  it('should boom if mine is revealed', function () {
    var grid = new Grid(6, 6, 3);
    grid.reveal(0, 1);
    expect(grid.board[0][1].value).toEqual('Boom!');
    expect(grid.board[0][1].discovered).toBe(true);
  });

  it('should mark a tile', function () {
    var grid = new Grid(6, 6, 3);
    expect(grid.board[0][1].marked).toBe(false);
    grid.toggle(0, 1);
    expect(grid.board[0][1].marked).toBe(true);
    expect(grid.numMarked).toEqual(1);
  });

  it('should unmark a tile', function () {
    var grid = new Grid(6, 6, 3);
    grid.toggle(0, 1);
    grid.toggle(0, 1);
    expect(grid.board[0][1].marked).toBe(false);
    expect(grid.numMarked).toEqual(0);
  });

});
