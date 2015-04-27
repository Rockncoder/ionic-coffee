(function () {
    "use strict";

    angular.module('coffee')
        .run(['$ionicPlatform', 'ListingsService', 'LocationService',
            function ($ionicPlatform, ListingsService, LocationService) {
                $ionicPlatform.ready(function () {
                    LocationService.init();
                    if (window.StatusBar) {
                        StatusBar.styleDefault();
                    }
                });
            }]);
}());