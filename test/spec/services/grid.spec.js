'use strict';

describe('Service: Grid', function () {

  // load the service's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
  });

  // instantiate service
  var Grid;
  beforeEach(inject(function (_Grid_) {
    Grid = _Grid_;
  }));

  it('should return constructor', function () {
    expect(typeof Grid).toBe('function');
  });

  it('should have array of mines with correct size', function () {
    var grid = new Grid(10, 12, 10);
    expect(Array.isArray(grid.mines)).toBe(true);
    expect(grid.mines.length).toEqual(10);
    grid.mines.forEach(function (x) {
      expect(x.length).toEqual(12);
    });
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

  it('should return the amount of mines around', function () {

  });

});
