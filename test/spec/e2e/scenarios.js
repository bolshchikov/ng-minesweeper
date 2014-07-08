'use strict';

describe('ngMinesweeperApp', function () {

  beforeEach(function () {
    browser.addMockModule('ngMinesweeperAppMocks', function () {});
  });

  afterEach(function () {
    browser.removeMockModule();
  });

  it('should load successfully', function () {
    browser.get('/');
    expect(element(by.css('h3')).getText()).toEqual('Enjoy coding! - Yeoman');
  });

});
