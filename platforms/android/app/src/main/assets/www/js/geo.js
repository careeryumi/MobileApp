/**
 // Mobile web development
 // Final Project
 // Template for General purpose html5 page with JQuery Mobile
 // Created by: Yumi Lee
 // email: ylee4918@conestogac.on.ca
 // Date: April 18, 2020
 */

var lat;
var lng;
var alt;

function showMap() {
    //initialize platform object
    var platform = new H.service.Platform({
        // 'apikey': 'RWEAzxfCfBTYTRvhHTEJtP-hHj0yRn306JdDS9gq4xs'
        'apikey': '1uKgsQQMtqyLjq9jOVXcj8qY5ked2R09B10zO0b0Pug'
    });

    // Obtain the default map types from platform object
    var maptypes = platform.createDefaultLayers();

    //instantiate and display a map object

    var map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map,
        {
            zoom: 15,
            center: {
                lng: lng,
                lat: lat
            }
        }
    );

    // create a marker at current location
    var icon = new H.map.Icon('img/marker2.png');
    var marker = new H.map.Marker(
        {
            lat: lat,
            lng: lng
        },
        {
            icon: icon
        }
    );

    //add marker to the map
    map.addObject(marker);
}

function getPosition() {
    try {
        if (navigator.geolocation != null) {
            var options={
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };

            function successCallback(position){
                var coordinates = position.coords;
                lat = coordinates.latitude;
                lng = coordinates.longitude;
                alt = coordinates.altitude;

                console.info("Latitude: " + lat);
                console.info("Longiture: " + lng);
                console.info("Altitude: "  + alt);

                // show map here
                showMap();
            }
            function errorCallback(error){
                var msg = "";
                try {
                    if (error){
                        switch (error.code) {
                            case error.TIMEOUT:
                                msg = "TIMEOUT: " + error.message;
                                break;
                            case error.PERMISSION_DENIED:
                                msg = "PERMISSION_DENIED: " + error.message;
                                break;
                            case error.POSITION_UNAVAILABLE:
                                msg = "TIMEPOSITION_UNAVAILABLEOUT: " + error.message;
                                break;
                            default:
                                msg = "UNHANDLED MESSAGE CODE:(" + error.code + ") : "  + error.message;
                                break;

                        }
                        console.error(msg);

                    }
                } catch (e) {
                    console.error("Exception in errorCallback(): " + e);
                }
            }

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        }
        else{
            console.error("Geolocation is not supported");
        }
    } catch (e) {
        console.error("Exception in getPosition(): " + e);
    }

}
