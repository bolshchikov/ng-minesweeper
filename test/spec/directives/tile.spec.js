'use strict';

xdescribe('Directive: tile', function () {

  // load the directive's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
  });

  var element, parentScope, isolatedScope;

  var X = '10', Y = '10', value = -1;
  var grid = {
    board: [[value]]
  };
  var classes = {
    MINED: 'mined',
    MARKED: 'marked',
    DISCOVERED: 'discovered'
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
  
  it('should have no classes besides tile', function () {
    var tile = element.find('.tile');
    expect(tile).toBeDefined();
    for (var name in classes) {
      expect(tile.hasClass(classes[name])).toBe(false);
    }
  });

  xit('should call toggle on click', function () {
    spyOn(isolatedScope, 'reveal');
    element.find('.tile').trigger('click');
    expect(isolatedScope.reveal).toHaveBeenCalled();
  });
});
