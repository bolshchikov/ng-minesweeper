'use strict';

var Minesweeper = require('./minesweeper-object.js');

function MineSweeperPage() {

  this.widthInput = element(by.model('main.gridWidth'));
  this.heightInput = element(by.model('main.gridHeight'));
  this.minesInput = element(by.model('main.numOfMines'));

  this.get = function () {
    browser.get('/');
  };

  this.getTitle = function () {
    return element(by.css('h1'));
  };

  this.setParams = function (width, height, mines) {
    this.widthInput.sendKeys(width);
    this.heightInput.sendKeys(height);
    this.minesInput.sendKeys(mines);
  };

  this.generateGrid = function () {
    element(by.buttonText('Go!')).click();
    return new Minesweeper();
  };
}

module.exports = MineSweeperPage;