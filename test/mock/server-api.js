'use strict';

angular.module('ngMinesweeperAppMocks', ['ngMockE2E'])
  .run(function ($httpBackend) {
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
  });
