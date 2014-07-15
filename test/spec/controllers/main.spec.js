'use strict';

describe('Controller: ParametersCtrl', function () {

  // load the controller's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
  });

  var ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should generate a new grid', function () {
    ctrl.generate(9, 9, 10);
    expect(ctrl.grid).toBeDefined();
    expect(ctrl.grid.width).toEqual(9);
    expect(ctrl.grid.height).toEqual(9);
  });

});
