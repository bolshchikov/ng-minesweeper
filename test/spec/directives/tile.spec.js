'use strict';

describe('Directive: tile', function () {

  // load the directive's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
  });

  var element, parentScope, isolatedScope;

  var X = '10', Y = '10', value = -1;
  var grid = {
    board: [[value]]
  };

  beforeEach(inject(function ($templateCache, $compile, $rootScope) {
    parentScope = $rootScope.$new();
    parentScope.x = X;
    parentScope.y = Y;
    parentScope.grid = grid;
    parentScope.value = value;

    element = angular.element('<tile x="{{x}}}" y="{{y}}" grid="grid" value="{{value}}"></tile>');
    $compile(element)(parentScope);
    parentScope.$digest();
    isolatedScope = element.scope();
  }));

  it('should check scope values', function () {
    expect(isolatedScope.x).toEqual(X);
    expect(isolatedScope.y).toEqual(Y);
    expect(isolatedScope.grid).toEqual(grid);
    expect(isolatedScope.value).toEqual(value);
  });
});
