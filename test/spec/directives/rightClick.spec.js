'use strict';

describe('Directive: rightClick', function () {

  // load the directive's module
  beforeEach(function () {
    module('ngMinesweeperAppInternal');
  });

  var element, scope;

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    scope.callback = function () {};
    spyOn(scope, 'callback');
    element = angular.element('<div right-click="callback()"></div>');
    $compile(element)(scope);
    scope.$digest();
  }));
  
  it('should check that the callback is called', function () {
    element.trigger('contextmenu');
    expect(scope.callback).toHaveBeenCalled();
  });

});
