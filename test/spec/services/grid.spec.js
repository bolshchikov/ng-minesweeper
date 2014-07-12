'use strict';

describe('Service: Grid', function () {

  // load the service's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
  });

  // instantiate service
  var Grid, tileState;

  beforeEach(inject(function (_Grid_, _tileState_) {
    Grid = _Grid_;
    tileState = _tileState_;
  }));

  it('should return constructor', function () {
    expect(typeof Grid).toBe('function');
  });

  it('should have requires api', function () {
    var grid = new Grid(9, 9, 10);
    expect(Array.isArray(grid.board)).toBe(true);
    expect(typeof grid.reveal).toEqual('function');
    expect(typeof grid.revealMore).toEqual('function');
    expect(typeof grid.mark).toEqual('function');
    expect(typeof grid.unmark).toEqual('function');
  });

  it('should have the array of a grid in the initial state', inject(function (tileState) {
    var grid = new Grid(10, 12, 10);
    expect(Array.isArray(grid.board)).toBe(true);
    expect(grid.board.length).toEqual(10);
    grid.board.forEach(function (x) {
      expect(x.length).toEqual(12);
    });
    expect(grid.board[0][0]).toEqual(tileState.UNKNOWN);
  }));

  it('should have array of mines with correct size', function () {
    var grid = new Grid(10, 12, 10);
    expect(Array.isArray(grid.mines)).toBe(true);
    expect(grid.mines.length).toEqual(10);
    grid.mines.forEach(function (x) {
      expect(x.length).toEqual(12);
    });
  });

  it('should have the correct amount of mines', function () {
    var grid = new Grid(5, 5, 10);
    var res = 0;
    grid.mines.forEach(function (rows) {
      rows.forEach(function (item) {
        if (item) { res += 1; }
      });
    });
    expect(res).toEqual(10);
  });

  it('should return the amount of mines around', function () {
    var grid = new Grid(3, 3, 3);
    grid.mines = [
      [false, true, false],
      [true, false, false],
      [false, false, true]
    ];
    expect(grid._closeMines(0, 0)).toEqual(2);
    expect(grid._closeMines(1, 1)).toEqual(3);
  });

});
