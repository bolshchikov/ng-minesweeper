'use strict';

angular.module('ngMinesweeperAppBoardMock', ['ngMockE2E'])
  .factory('boardMock', function () {
    return [
      [{ value: -1, mine: false, marked: false }, { value: -1, mine: true, marked: false }, { value: -1, mine: false, marked: false }],
      [{ value: -1, mine: true, marked: false }, { value: -1, mine: false, marked: false }, { value: -1, mine: false, marked: false }],
      [{ value: -1, mine: false, marked: false }, { value: -1, mine: false, marked: false }, { value: -1, mine: true, marked: false }]
    ];
  });