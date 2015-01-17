(function () {
    "use strict";

    angular.module('coffee')
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $stateProvider
                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "system/menu.html",
                        controller: 'MenuController'
                    })
                    .state('app.listings', {
                        url: "/listings",
                        views: {
                            'menuContent': {
                                templateUrl: "listings/listings.html",
                                controller: "ListingsController"
                            }
                        }
                    })
                    .state('app.map', {
                        url: "/map",
                        views: {
                            'menuContent': {
                                templateUrl: "map/map.html",
                                controller: "MapController"
                            }
                        }
                    })
                    .state('app.details', {
                        url: "/details/:id",
                        views: {
                            'menuContent': {
                                templateUrl: "details/details.html",
                                controller: "DetailsController"
                            }
                        }
                    })
                    .state('app.settings', {
                        url: "/settings",
                        views: {
                            'menuContent': {
                                templateUrl: "settings/settings.html",
                                controller: "SettingsController"
                            }
                        }
                    })
                    .state('app.about', {
                        url: "/about",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/about.html"
                            }
                        }
                    });

                $urlRouterProvider.otherwise('/app/listings');
            }]);
}());