(function () {
    "use strict";

    angular.module('coffee')
        .service('ListingsService', ['$http', '$q', '$ionicLoading', 'YP_BASE_ADDRESS', 'YP_API_KEY', 'Settings', 'LocationService', 'DETAILS_ADDRESS',
            function ($http, $q, $ionicLoading, YP_BASE_ADDRESS, YP_API_KEY, Settings, LocationService, DETAILS_ADDRESS) {

                var lastLocation = null,
                    cachedListings = [];

                return {
                    getListings: getListings,
                    getBusiness: getBusiness,
                    getSingleBusiness: getSingleBusiness,
                    getCached: getCached
                };

                function filterOutMetaData(data) {
                    var meta, listings;

                    if (data && data.searchResult && data.searchResult.metaProperties) {
                        meta = data.searchResult.metaProperties;

                        if (meta.resultCode === "Success") {
                            listings = data.searchResult.searchListings.searchListing;
                            if (!listings) {
                                listings = [];
                                listings.totalAvailable = 0;
                                listings.totalPages = 0;
                                return listings;
                            }

                            cachedListings = cachedListings.concat(listings);
                            listings.totalAvailable = meta.totalAvailable;
                            listings.totalPages = Math.ceil(listings.totalAvailable / Settings.listingsPerPage);
                            return listings;
                        }
                    }
                }

                function getListings(currentPage) {
                    var url,
                        deferred = $q.defer();

                    currentPage = currentPage || 0;
                    url = YP_BASE_ADDRESS + Settings.location + "&pagenum=" + currentPage +
                    "&term=" + Settings.term + "&radius=" + Settings.searchRadiusInMiles.value +
                    "&listingcount=" + Settings.listingsPerPage + "&key=" + YP_API_KEY;

                    console.log("URL: " + url);

                    $http.get(url)
                        .success(function (data) {
                            var listings = filterOutMetaData(data);
                            deferred.resolve(listings);
                        })
                        .error(function (data, status) {
                            console.log("Error while making call");
                            deferred.reject();
                        });
                    return deferred.promise;
                }

                function getBusiness(businessId) {
                    var deferred = $q.defer();

                    setTimeout(function () {
                        var item, ndx,
                            results = null,
                            len = cachedListings.length;
                        businessId = +businessId;
                        for (ndx = 0; ndx < len; ndx += 1) {
                            item = cachedListings[ndx];
                            if (item.listingId === businessId) {
                                results = item;
                                return deferred.resolve(results);
                            }
                        }
                        if (results === null) {
                            // we would fire a request to look up the data
                        }
                        return deferred.reject("Error: Id not found");
                    });
                    return deferred.promise;
                }

                function getSingleBusiness(businessId) {
                    var url,
                        deferred = $q.defer();

                    url = DETAILS_ADDRESS + businessId + "&key=" + YP_API_KEY;

                    console.log("URL: " + url);

                    $http.get(url)
                        .success(function (data) {
                            deferred.resolve(data.listingsDetailsResult.listingsDetails.listingDetail[0]);
                        })
                        .error(function (data, status) {
                            console.log("Error while making call");
                            deferred.reject();
                        });
                    return deferred.promise;
                }

                function getCached() {
                    var deferred = $q.defer();

                    if (cachedListings && cachedListings.length) {
                        setTimeout(function () {
                            return deferred.resolve(cachedListings);
                        });
                    } else {
                        getListings(0).then(function (lists) {
                            deferred.resolve(lists);
                        }, function (err) {
                            deferred.reject(null);
                        });
                    }
                    return deferred.promise;
                }
            }]);
}());