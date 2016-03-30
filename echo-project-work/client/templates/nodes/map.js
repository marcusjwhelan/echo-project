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
      var recentNode = Nodes.find({name: nodeName},
          {sort:{createdAt: -1},limit: 1}).fetch();
      /*-----------------------get the longitude-----------------------------*/
      var lat = _.pluck(recentNode,'latitude');
      /*-----------------------get the latitude ----------------------------------*/
      var lon = _.pluck(recentNode,'longitude');
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
      let node = Nodes.findOne({ name: Router.current().params.name });
      if( node ) {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;
    
        // get the name from the current station's page we are on. through the router.
        var nodeName = node.name;
        // grab the last 20 of this Nodes collection
        var recentNode = Nodes.find({name: nodeName},
         {sort:{createdAt: -1},limit: 1}).fetch();
        /*-----------------------get the longitude-----------------------------*/
        var lat = _.pluck(recentNode,'latitude');
        /*-----------------------get the latitude ----------------------------------*/
        var lon = _.pluck(recentNode,'longitude');
        /*----------------------------------------------------------------------*/
        /* if there is a marker. IE there will be one after you
        have visited another page with a node. This will delete 
        all nodes so there can't be infinite markers on map.*/
        if(marker){
          marker.setMap(null);
        }
        
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat,lon),
          map:map.instance
        });
        
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
