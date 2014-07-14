'use strict';

function MineSweeperObject() {

  this.container = element(by.css('.grid-wrapper'));
  this.remains = element(by.css('.status-bar input'));
  this.rows = element.all(by.repeater('row in main.grid.board'));
  this.tiles = element.all(by.css('tile'));

  this._getTiles = function (row) {
    return row.all(by.repeater('tile in row'));
  };

  this._getTile = function (x, y) {
    return this._getTiles(this.rows.get(x)).get(y).element(by.css('tile'));
  };

  this.revealTile = function (x, y) {
    var tile = this._getTile(x, y);
    tile.click();
    return tile;
  };

  this.markTile = function (x, y) {
    var tile = this._getTile(x, y);
    browser.actions().mouseMove(tile).perform();
    browser.actions().click(protractor.Button.RIGHT).perform();
    return tile;
  };


}

module.exports = MineSweeperObject;