(function () {
    'use strict';

    angular.module('coffee')
        .controller('SettingsController', ['$scope', 'Settings',
            function ($scope, Settings) {
                console.log("SettingsController launching");
                var range = [
                    {name:"1 mile", value:"1"},
                    {name:"2 miles", value:"2"},
                    {name:"5 miles", value:"5"},
                    {name:"10 miles", value:"10"},
                    {name:"20 miles", value:"20"}
                ];

                $scope.nearbyRange = range;
                $scope.searchRadiusInMiles = Settings.searchRadiusInMiles;
                $scope.useGps = Settings.useGps;

                $scope.onChange = function(type, value){
                    $scope[type] = value;
                    Settings[type] = value;
                };
            }]);
}());
