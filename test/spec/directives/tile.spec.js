'use strict';

describe('Directive:tile', function () {

  // load the directive's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
    module('ngMinesweeperAppBoardMock');
  });

  var element, parentScope, isolatedScope;
  var x = 1, y = 1;

  var injectFn = function (x, y) {
    return function ($compile, $rootScope, boardMock) {
      parentScope = $rootScope.$new();
      parentScope.x = x;
      parentScope.y = y;
      parentScope.grid = {
        board: boardMock,
        toggle: jasmine.createSpy('toggle'),
        reveal: function (x, y) {
          boardMock[x][y].value = 1;
        }
      };
      parentScope.tile = boardMock[x][y];

      element = angular.element('<tile x="{{x}}" y="{{y}}" grid="grid" tile="tile"></tile>');
      $compile(element)(parentScope);
      parentScope.$digest();
      isolatedScope = element.isolateScope();
    };
  };

  var getClasses = function () {
    if (element) {
      return element[0].className;
    }
  };

  beforeEach(inject(injectFn(x, y)));

  it('should check scoped values', inject(function (boardMock) {
    expect(isolatedScope.x).toEqual(x+'');
    expect(isolatedScope.y).toEqual(y+'');
    expect(isolatedScope.tile).toEqual(boardMock[x][y]);
  }));

  it('should have no classes besides tile', function () {
    var classes = getClasses();
    expect(classes.indexOf('discovered')).toEqual(-1);
    expect(classes.indexOf('marked')).toEqual(-1);
    expect(classes.indexOf('mined')).toEqual(-1);
  });

  it('should call toggle when on right click', function () {
    element.trigger('contextmenu');
    expect(parentScope.grid.toggle).toHaveBeenCalledWith(1, 1);
  });

  it('should have marked class on marked tile', function () {
    expect(element).not.toHaveClass('marked');
    parentScope.$apply(function () {
      parentScope.grid.board[1][1].marked = true;
    });
    expect(element).toHaveClass('marked');
  });

  it('should have mined class on mined tile', function () {
    expect(element).not.toHaveClass('mined');
    parentScope.$apply(function () {
      parentScope.grid.board[1][1].mine = true;
      parentScope.grid.board[1][1].value = null;
    });
    expect(element).toHaveClass('mined');
  });

  it('should have discovered class on discovered tile', function () {
    expect(element).not.toHaveClass('discovered');
    parentScope.$apply(function () {
      parentScope.grid.board[1][1].value = 3;
    });
    expect(element).toHaveClass('discovered');
  });

  describe('Directive:tile:non-mine', function () {
    var x = 0, y = 0;

    beforeEach(inject(injectFn(x, y)));

    it('should call reveal method of grid', function () {
      spyOn(parentScope.grid, 'reveal');
      element.trigger('click');
      expect(parentScope.grid.reveal).toHaveBeenCalled();
    });

    it('should show the value', function () {
      element.trigger('click');
      var content = element.find('span');
      expect(content.css('display')).not.toEqual('none');
      expect(content.html()).toEqual('1');
    });
  });

  describe('Directive:tile:mine', function () {
    var x = 0, y = 1;
    beforeEach(inject(injectFn(x, y)));
    it('should show tile with mine', function () {
      element.trigger('click');
      var classes = getClasses();
      expect(classes.indexOf('mined')).not.toEqual(-1);
    });
  });
});
