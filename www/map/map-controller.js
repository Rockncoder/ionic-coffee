(function () {
    "use strict";

    angular.module("coffee")
        .controller("MapController", ['$scope', 'MapService', 'LocationService', 'ListingsService',
            function ($scope, MapService, LocationService, ListingsService) {
//            var locations = MapService.getAll();
                var locations = [],
                    position = {};

                console.log("waiting for mapInit");

                $scope.$on('mapInitialized', function (event, map) {

                    LocationService.getCurrentPosition().then(function (position) {
                        console.log("Got a fresh position: " + JSON.stringify(position.coords));
                        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        map.setCenter(latLng);

                        ListingsService.getCached().then(function (list) {
                            var bounds = MapService.drawMarkers(map, list);
                            map.fitBounds(bounds);
                        });
                    });
                });
            }]);
}());