(function () {
    "use strict";

    angular.module("coffee")
        .service('LocationService', ['$q', 'Settings', function ($q, Settings) {
            var autoUpdateLocation = true,
                hasGeoLocation = ("geolocation" in navigator),
                geo = navigator.geolocation,
                watchId = null,
                lastPosition = null,
                geo_options = {
                    enableHighAccuracy: true,
                    maximumAge: 30000,
                    timeout: 27000
                };

            console.log("geo = " + hasGeoLocation);
            init();

            return {
                init: init,
                stop: stop,
                getCurrentPosition: getCurrentPosition,
                getLastPosition: getLastPosition,
                pauseUpdates: pauseUpdates,
                resumeUpdates: resumeUpdates
            };

            function init() {
                if (hasGeoLocation && Settings.useGps) {
                    navigator.geolocation.getCurrentPosition(savePosition);
                    watchId = navigator.geolocation.watchPosition(savePosition, errorPosition, geo_options);
                }
            }

            function stop() {
                if (watchId) {
                    navigator.geolocation.clearWatch(watchId);
                    watchId = null;
                }
            }

            function getCurrentPosition() {
                var deferred = $q.defer();
                if (lastPosition) {
                    console.log("Have a position already");
                    setTimeout(function () {
                        deferred.resolve(lastPosition);
                    });
                } else {
                    console.log("Checking...");
                    navigator.geolocation.getCurrentPosition(function (position) {
                        return deferred.resolve(position);
                    }, function (err) {
                        return deferred.reject(null);
                    });
                }
                return deferred.promise;
            }

            function getLastPosition() {
                return lastPosition;
            }

            function pauseUpdates() {
                console.log("pauseUpdates");
                autoUpdateLocation = false;
            }

            function resumeUpdates() {
                console.log("resumeUpdates");
                autoUpdateLocation = true;
            }

            function savePosition(position) {
                var loc = position.coords.latitude + "%3A" + position.coords.longitude;
                console.log(JSON.stringify(position));
                lastPosition = position;
                if (!Settings.useGps && watchId) {
                    navigator.geolocation.clearWatch(watchId);
                    watchId = null;
                } else if (autoUpdateLocation) {
                    console.log("Location updated");
                    Settings.location = loc;
                }
            }

            function errorPosition() {
                console.log("Error received in geolocation");
            }
        }]);
}());