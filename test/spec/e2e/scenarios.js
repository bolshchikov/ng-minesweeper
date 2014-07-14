'use strict';

var MinesweeperPage = require('./minesweeper-page.js');

describe('ngMinesweeperApp', function () {

  var page;

  beforeEach(function () {
    browser.addMockModule('ngMinesweeperAppMocks', function () {});
    page = new MinesweeperPage();
  });

  afterEach(function () {
    browser.removeMockModule();
  });

  it('should check the title', function () {
    page.get();
    expect(page.getTitle().getText()).toEqual('This is ng-minesweeper');
  });

  it('should generate a grid', function () {
    page.get();
    page.setParams(9, 9, 10);
    expect(page.generateGrid()).toBeDefined();
  });

  it('should show the initial amount of mines', function () {
    page.get();
    page.setParams(9, 9, 10);
    var grid = page.generateGrid();
    expect(grid.remains.getAttribute('value')).toEqual('10');
  });

  it('should show the correct grid', function () {
    page.get();
    page.setParams(9, 9, 10);
    var grid = page.generateGrid();
    expect(grid.rows.count()).toEqual(9);
    expect(grid.tiles.count()).toEqual(81);
  });

  it('should reveal a tile', function () {
    page.get();
    page.setParams(9, 9, 10);
    var grid = page.generateGrid();
    var tile = grid.revealTile(0, 0);
    tile.getAttribute('value').then(function (arg) {
      var val = parseInt(arg, 10);
      expect(isNaN(val)).toBe(false);
      expect(val).not.toEqual(-1);
      expect(val).not.toEqual(-2);
    });
  });

  it('should mark a tile', function () {
    page.get();
    page.setParams(9, 9, 10);
    var grid = page.generateGrid();
    var tile = grid.markTile(0, 0);
    expect(tile.getAttribute('value')).toEqual('-2');
  });


});
