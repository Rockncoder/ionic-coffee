(function () {
    "use strict";

    angular.module('coffee')
        .constant("YP_BASE_ADDRESS", "http://pubapi.yp.com/search-api/search/devapi/search?format=json&sort=distance&searchloc=")
        .constant("DETAILS_ADDRESS","http://api2.yp.com/listings/v1/details?format=json&listingid=")
        .constant("YP_API_KEY", "w4ycm9k9ct")
        .value("Settings", {
            searchRadiusInMiles: {value: "5"},
            term: "coffee",
            location: "92618",
            listingsPerPage: 20,
            useGps: true
        });
}());
