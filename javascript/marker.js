var Marker = function(data) {
    var self = this;
    this.name = data.title;
    this.street = '',
    this.city = '',
    this.position = data.position;
    this.active = ko.observable(true);
    var fourSquareReqURL = 'https://api.foursquare.com/v2/venues/search?ll=' 
        + this.position.lat + ',' + this.position.lng 
        + '&oauth_token=N31IJX0PD5V5R43ECZJ0DI4SUQ0NZGHQEOABVLMXCKOS5TQX&v=20180303';

    // to get detailed place data using foursquare
    $.getJSON(fourSquareReqURL).done(function(data) {
    var response = data.response.venues[0];
        self.street = response.location.formattedAddress[0] ? response.location.formattedAddress[0]: 'N/A';
        self.city = response.location.formattedAddress[1] ? response.location.formattedAddress[1]: 'N/A';
    }).fail(function() {
        alert('Error occured while processing foursquare request');
    });

    this.marker = new google.maps.Marker({
        position: this.position,
        name: data.title
    });

    this.showPlace = function(location) {
       google.maps.event.trigger(self.marker, 'click');
    };

    this.marker.addListener('click', function() {
        showPlaceInfo(this, self.street, self.city, infoWindow);
        map.panTo(this.getPosition());
        toggleBounce(this);
    });

    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }

    self.filterMarkers = ko.computed(function () {
        if(self.active() == true) {
            self.marker.setMap(map);
            bounds.extend(self.marker.position);
            map.fitBounds(bounds);
        } else {
            self.marker.setMap(null);
        }
    });
};