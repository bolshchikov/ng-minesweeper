'use strict';

describe('Directive:tile', function () {

  // load the directive's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
  });

  var element, parentScope, isolatedScope;
  var x = 0, y = 0;
  var tile = {
    value: 2,
    discovered: false,
    marked: false,
    mine: false
  };

  beforeEach(inject(function ($compile, $rootScope) {
    parentScope = $rootScope.$new();
    parentScope.x = x;
    parentScope.y = y;
    parentScope.grid = {
      toggle: jasmine.createSpy('toggle'),
      reveal: jasmine.createSpy('reveal')
    };
    parentScope.tile = tile;
    element = angular.element('<tile x="{{x}}" y="{{y}}" grid="grid" tile="tile"></tile>');
    $compile(element)(parentScope);
    parentScope.$digest();
    isolatedScope = element.isolateScope();
  }));

  afterEach(function () {
    tile.value = 2;
    tile.discovered = false;
    tile.marked = false;
    tile.mine = false;
  });

  it('should check scoped values', function () {
    expect(parseInt(isolatedScope.x, 10)).toEqual(x);
    expect(parseInt(isolatedScope.y, 10)).toEqual(y);
    expect(isolatedScope.tile).toEqual(tile);
  });

  it('should display value correctly', function () {
    expect(element.find('span').html()).toEqual('2');
  });

  it('should have no classes besides tile', function () {
    expect(element).toHaveClass('tile');
    expect(element).not.toHaveClass('discovered');
    expect(element).not.toHaveClass('marked');
    expect(element).not.toHaveClass('mined');
  });

  it('should have marked class on marked tile', function () {
    parentScope.$apply(function () {
      tile.marked = true;
    });
    expect(element).toHaveClass('marked');
  });

  it('should have mined class on mined tile', function () {
    parentScope.$apply(function () {
      tile.mine = true;
      tile.discovered = true;
    });
    expect(element).toHaveClass('mined');
  });

  it('should have discovered class on discovered tile', function () {
    parentScope.$apply(function () {
      tile.discovered = true;
    });
    expect(element).toHaveClass('discovered');
  });

  it('should call reveal method of grid', function () {
    element.trigger('click');
    expect(parentScope.grid.reveal).toHaveBeenCalledWith(x, y);
  });

  it('should call toggle when on right click', function () {
    element.trigger('contextmenu');
    expect(parentScope.grid.toggle).toHaveBeenCalledWith(x, y);
  });

});
