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

});
