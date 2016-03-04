var MAP_ZOOM = 15;
Template.map.onRendered(function() {
  GoogleMaps.load();
});

Template.map.helpers({  
  MapOptions: function() {
    let node = Nodes.findOne({ name: Router.current().params.name });
    if( node ) {
      // get the name from the current station's page we are on. through the router.
      var nodeName = node.name;
      // grab the last 20 of this Nodes collection
      var redentNode = Nodes.find({name: nodeName},
                                    {sort:{createdAt: -1},limit: 1}).fetch();
      /*-----------------------get the longitude-----------------------------*/
      var lat = _.pluck(redentNode,'latitude');
      /*-----------------------get the latitude ----------------------------------*/
      var lon = _.pluck(redentNode,'longitude');
      /*----------------------------------------------------------------------*/
    }
    var latLng = Geolocation.latLng();
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded() && latLng) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(lat,lon),
        zoom: MAP_ZOOM
      };
    }// IF GOOGLE.  
    
  }
});

Template.map.onCreated(function() {
  GoogleMaps.ready('Map', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    Tracker.autorun(function() {
      var latLng = Geolocation.latLng();
      if (! latLng)
        return;
    
      let node = Nodes.findOne({ name: Router.current().params.name });
      if( node ) {
        // get the name from the current station's page we are on. through the router.
        var nodeName = node.name;
        console.log(nodeName);
        // grab the last 20 of this Nodes collection
        var redentNode = Nodes.find({name: nodeName},
                                      {sort:{createdAt: -1},limit: 1}).fetch();
        /*-----------------------get the longitude-----------------------------*/
        var lat = _.pluck(redentNode,'latitude');
        /*-----------------------get the latitude ----------------------------------*/
        var lon = _.pluck(redentNode,'longitude');
        /*----------------------------------------------------------------------*/
        if(!marker){
        // If the marker doesn't yet exist, create it.
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lon),
            map: map.instance
          });
        }
        // The marker already exists, so we'll just change its position.
        else{
          marker.setPosition(latLng);
        }
        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      }
    });
  });
});

 /* // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('Map', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });*/
//});
