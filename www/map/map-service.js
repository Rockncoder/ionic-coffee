(function () {
    "use strict";

    angular.module("coffee")
        .service('MapService', ['$state',
            function ($state) {

                return {
                    getLocation: getLocation,
                    getAll: getAll,
                    pinSymbol: pinSymbol,
                    drawMarkers: drawMarkers
                };

                function pinSymbol(color) {
                    return {
                        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
                        fillColor: color,
                        fillOpacity: 1,
                        strokeColor: '#222',
                        strokeWeight: 2,
                        scale: 1
                    };
                }

                function getLocation(location) {
                    var found = null;
                    location = location.toLowerCase();
                    angular.forEach(locations, function (value, key) {
                        if (location.indexOf(key) !== -1) {
                            console.log(angular.toJson(value));
                            value.key = key;
                            found = value;
                        }
                    });
                    return found;
                }

                function getAll(getAll) {
                    return locations;
                }

                function drawMarkers(myMap, locations) {
                    var bounds = new google.maps.LatLngBounds();

                    angular.forEach(locations, function (value, key) {
                        var latLng = new google.maps.LatLng(value.latitude, value.longitude),
                            marker = new google.maps.Marker({
                                position: latLng,
                                map: myMap,
                                title: value.name,
                                icon: pinSymbol('#FF2'),
                                myKey: key,
                                biz: value
                            });

                        bounds.extend(marker.position);

                        google.maps.event.addListener(marker, 'click', function () {
                            $state.go('app.details', {id: this.biz.listingId});
                        });
                    });

                    return bounds;
                };
            }]);
}());