(function () {
    "use strict";

    angular.module('coffee')
        .run(['$ionicPlatform', 'ListingsService', 'LocationService',
            function ($ionicPlatform, ListingsService, LocationService) {
                $ionicPlatform.ready(function () {
                    if (window.StatusBar) {
                        // org.apache.cordova.statusbar required
                        StatusBar.styleDefault();
                    }
                });
            }]);
}());