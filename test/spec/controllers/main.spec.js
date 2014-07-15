'use strict';

describe('Controller: ParametersCtrl', function () {

  // load the controller's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
  });

  var ctrl, scope, mockBackend, url;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _GameURL_) {
    mockBackend = _$httpBackend_;
    url = _GameURL_.url;
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should load the grid', function () {
    expect(ctrl.grid).toBeUndefined();

    mockBackend.expectGET(url).respond({
      width: 10,
      height: 10,
      numMines: 3,
      board: 'board'
    });

    mockBackend.flush();

    expect(ctrl.grid).toBeDefined();
    expect(ctrl.grid.width).toEqual(10);
    expect(ctrl.grid.height).toEqual(10);
    expect(ctrl.grid.numMines).toEqual(3);
    expect(ctrl.grid.board).toEqual('board');
    expect(typeof ctrl.grid.toggle).toEqual('function');
    expect(typeof ctrl.grid.reveal).toEqual('function');
  });

  it('should generate a new grid', function () {
    ctrl.generate(9, 9, 10);
    expect(ctrl.grid).toBeDefined();
    expect(ctrl.grid.width).toEqual(9);
    expect(ctrl.grid.height).toEqual(9);
  });

  it('should perform a save', function () {

  });

});
