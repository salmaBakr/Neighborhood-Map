// google maps init
function initMap() {

    var Alexandria = {
        lat: 31.2000924,
        lng: 29.9187387

    };
    places = [
      {
            title: 'Cairo',
            position: {
                lat: 30.0444196,
                lng: 31.2357116
            }
        },
        {
            title: 'Alexandria',
            position: {
                lat: 31.2000924,
                lng: 29.9187387
            }
        },
        {
            title: 'Luxor',
            position: {
                lat: 25.6872431,
                lng : 32.6396357
            }
        },
        {
            title: 'Aswan',
            position: {
                lat: 24.088938,
                lng: 32.8998293
            }
        },
        {
            title: 'Sharm El-Sheikh',
            position: {
                lat: 27.9158175,
                lng : 34.3299505
            }
        }
    ];
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: Alexandria
    });

    infoWindow = new google.maps.InfoWindow();

    bounds = new google.maps.LatLngBounds();

    ko.applyBindings(new ViewModel());
}

var ViewModel = function() {
    var that = this;

    this.requiredPlace = ko.observable('');

    this.mapList = ko.observableArray([]);

    places.forEach(function(place) {
        that.mapList.push(new Marker(place));
    });

    this.mapPlaces = ko.computed(function() {
        // filter places list given text fom input text field
        var searchFilter = that.requiredPlace().toLowerCase();
        if (searchFilter) {
            for (var i = 0; i < that.mapList().length; i++) {
                if (that.mapList()[i].name.toLowerCase().startsWith(searchFilter)) {
                    that.mapList()[i].active(true);
                    return that.mapList()[i];
                }
            }
        } else {
            that.mapList().forEach(function(place) {
                place.active(true);
            });
            return that.mapList();
        }
    }, that);
};

// show selected place information in info window.
function showPlaceInfo(marker, street, city, infowindow) {
    infowindow.marker = marker;
    infowindow.setContent('<h1>' + marker.name + '</h1>' + '<p>' + street + "<br>" + city + "</p>");
    infowindow.open(map, marker);
}

// show alert to notify user of google maps error
function googleMapsErrorAlert() {
  alert('Error occured while processing google maps request');
}