(function () {
    "use strict";

    angular.module("coffee")
        .controller("ListingsController", ['$scope', 'ListingsService', 'LocationService',
            function ($scope, ListingsService, LocationService) {
                var currentPage = 0;
                $scope.showingListings = true;
                $scope.canShowMore = true;
                $scope.listings = [];

                $scope.setShowingListings = function (nextState) {
                    $scope.showingListings = nextState;
                };

                function init() {
                    ListingsService.getListings(currentPage).then(function (listings) {
                        $scope.listings = listings;
                        currentPage++;
                    });
                }

                $scope.refresh = function () {
                    $scope.listings = [];
                    currentPage = 0;

                    LocationService.init();
                    LocationService.getCurrentPosition().then(function (position) {
                        init();
                    });
                };

                $scope.loadMore = function () {
                    ListingsService.getListings(currentPage).then(function (listings) {
                        console.log("Listings: " + listings.length);
                        if(listings.length === 0){
                            $scope.canShowMore = false;
                        }else {
                            $scope.listings = $scope.listings.concat(listings);
                            currentPage++;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
                };

                init();
            }]);
}());