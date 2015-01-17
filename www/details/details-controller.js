(function () {
    "use strict";

    angular.module("coffee")
        .controller("DetailsController", ['$scope', 'MapService', 'LocationService', 'ListingsService', '$stateParams',
            function ($scope, MapService, LocationService, ListingsService, $stateParams) {
                var myMap = null;

                $scope.id = $stateParams.id;
                $scope.biz = {};
                console.log("DetailsController");
                LocationService.pauseUpdates();

                $scope.$on('mapInitialized', function (event, map) {
                    myMap = map;

                    console.log("mapInitialized");
                    ListingsService.getSingleBusiness($scope.id).then(function (business) {
                        if(business) {
                            $scope.biz = business;
                            var latLng = new google.maps.LatLng(business.latitude, business.longitude);
                            myMap.setCenter(latLng);
                            MapService.drawMarkers(myMap, [business]);
                        }
                    });
                });
            }]);
}());