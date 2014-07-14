'use strict';

describe('Service: Grid', function () {

  // load the service's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
    module('ngMinesweeperAppBoardMock');
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
    var grid = new Grid(9, 9, 10);
    expect(Array.isArray(grid.board)).toBe(true);
    expect(typeof grid.reveal).toEqual('function');
    expect(typeof grid.toggle).toEqual('function');
  });

  it('should check the created board of the correct size', function () {
    var grid = new Grid(10, 12, 10);
    expect(grid.board.length).toEqual(10);
    grid.board.forEach(function (row) {
      expect(row.length).toEqual(12);
    });
  });

  it('should check the inital state of the board', function () {
    var grid = new Grid(10, 12, 10);
    grid.board.forEach(function (row) {
      row.forEach(function (tile) {
        expect(tile.marked).toBe(false);
        expect(tile.value).toEqual(-1);
      });
    });
  });

  it('should check the correct amount of mines', function () {
    var grid = new Grid(10, 12, 10);
    var res = 0;
    grid.board.forEach(function (row) {
      row.forEach(function (tile) {
        if (tile.mine) { res += 1; }
      });
    });
    expect(res).toEqual(10);
  });

  it('should calculate the amount of mines around', inject(function (boardMock) {
    var grid = new Grid(3, 3, 3);
    grid.board = boardMock;
    expect(grid._closeMines(0, 0)).toEqual(2);
    expect(grid._closeMines(1, 1)).toEqual(3);
  }));

  it('should reveal non-mine tile', inject(function (boardMock) {
    var grid = new Grid(3, 3, 3);
    grid.board = boardMock;
    grid.reveal(0, 0);
    expect(grid.board[0][0].marked).toBe(true);
    expect(grid.board[0][0].value).toBe(2);
  }));

  it('should reveal mine tile', inject(function (boardMock) {
    var grid = new Grid(3, 3, 3);
    grid.board = boardMock;
    grid.reveal(0, 1);
    expect(grid.board[0][1].marked).toBe(true);
    expect(grid.board[0][1].value).toBe(null);
  }));

  it('should mark a tile', inject(function (boardMock) {
    var grid = new Grid(3, 3, 3);
    grid.board = boardMock;
    expect(grid.board[0][1].marked).toBe(false);
    grid.toggle(0, 1);
    expect(grid.board[0][1].marked).toBe(true);
  }));

  it('should unmark a tile', inject(function (boardMock) {
    var grid = new Grid(3, 3, 3);
    grid.board = boardMock;
    grid.toggle(0, 1);
    expect(grid.board[0][1].marked).toBe(true);
    grid.toggle(0, 1);
    expect(grid.board[0][1].marked).toBe(false);
  }));

});
