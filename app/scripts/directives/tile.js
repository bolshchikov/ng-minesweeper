'use strict';

angular.module('ngMinesweeperAppInternal')
  .directive('tile', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {},
      link: function postLink(scope, element, attrs) {
        element.text('this is the tile directive');
      }
    };
  });
