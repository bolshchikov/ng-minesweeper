'use strict';

describe('Controller: ParametersCtrl', function () {

  // load the controller's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
  });

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('controller should be defined', function () {
    expect(MainCtrl).toBeDefined();
  });

});
