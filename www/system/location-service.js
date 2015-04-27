(function () {
    "use strict";

    angular.module("coffee")
        .service('LocationService', ['$q', 'Settings', '$cordovaGeolocation', function ($q, Settings, $cordovaGeolocation) {
            var autoUpdateLocation = true,
                watch = null,
                lastPosition = null,
                geo_options = {
                    enableHighAccuracy: false,
                    maximumAge: 30000,
                    timeout: 60000,
                    frequency : 1000
                };

            return {
                init: init,
                stop: stop,
                getCurrentPosition: getCurrentPosition,
                getLastPosition: getLastPosition
                //pauseUpdates: pauseUpdates,
                //resumeUpdates: resumeUpdates
            };

            function init() {
                if (!!$cordovaGeolocation && Settings.useGps) {
                    $cordovaGeolocation.getCurrentPosition(geo_options).then(savePosition, errorPosition);
                    watch = $cordovaGeolocation.watchPosition(geo_options);
                    watch.promise.then(
                        null,
                        errorPosition,
                        savePosition
                    );
                }
            }

            function stop() {
                if (watch) {
                    watch.clearWatch();
                    watch = null;
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
                    $cordovaGeolocation.getCurrentPosition(function (position) {
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

            //function pauseUpdates() {
            //    console.log("pauseUpdates");
            //    autoUpdateLocation = false;
            //}
            //
            //function resumeUpdates() {
            //    console.log("resumeUpdates");
            //    autoUpdateLocation = true;
            //}

            function savePosition(position) {
                var loc = position.coords.latitude + "%3A" + position.coords.longitude;
                console.log(JSON.stringify(position));
                lastPosition = position;

                // if user decides not to use GPS, we need to stop watching the position
                if (!Settings.useGps && watch) {
                    watch.clearWatch();
                    watch = null;
                } else if (autoUpdateLocation) {
                    console.log("Location updated");
                    Settings.location = loc;
                }
            }

            function errorPosition(err) {
                console.log("Error received in geolocation: "+JSON.stringify(err));
                // only try to restart if I got a timed out
                if(err.code === 3){
                    init();
                }
            }
        }]);
}());