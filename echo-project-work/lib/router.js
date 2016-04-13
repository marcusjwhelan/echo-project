Router.configure({
  // we use the  layout template to define the layout for the entire app
  layoutTemplate: 'layout',
  // the notFound template is used for unknown routes and missing lists
  notFoundTemplate: 'notFound',
  // show the loading template whilst the subscriptions below load their data
  loadingTemplate: 'loading',

});

Router.route('/',{name: 'Home'});
// This will be here to deal with inserts form other destinations
Router.route('/insert',{
    where: 'server',
    action: function(){
      // get the name of the station from the url
      var name = this.params.query.name;
      var count_= Nodes.find({name: name}).count();
      // if the count is 8000 delete the last point then insert after to be back to 8000
      if(count_ > 7999){
        var last_node = Nodes.findOne({name: name},{sort: {createdAt: 1}});
        Nodes.remove({_id: last_node._id});
      }
      // convert all number strings to numbers
      var long = parseFloat(this.params.query.long)
      var lat = parseFloat(this.params.query.lat)
      var hum = parseFloat(this.params.query.hum)
      var temp = parseFloat(this.params.query.temp)
      var dew = parseFloat(this.params.query.dew)
      var pres = parseFloat(this.params.query.pres)
      var speed = parseFloat(this.params.query.speed)
      var dir = parseFloat(this.params.query.dir)
      // insert into collection
      Nodes.insert({name: name, dew: dew,
      temp: temp, direction: dir, speed: speed,
      longitude: long,latitude: lat, 
      humidity: hum, pressure: pres});
    }
  });

/*
  Route function to send the user all the data of a particular weather station. All sensor points
*/
Router.route('/download/:name',{
  // The name so it goes to the route and not the name of that link which is the page they are 
  // already on.
  name: 'download.name',
  // These functions are on the server so they have access to the full collection.
  where: 'server',
  action: function(){
    var filename = 'data_file.csv';
    var fileData ="";
    
    var headers = {
      'Content-type': 'text/csv',
      'Content-Disposition': "attachment; filename =" + filename
    };
    var records = Nodes.find({name: this.params.name},{sort: {createdAt: -1}});
    // row 1
    fileData = this.params.name+"\r\n";
    // row 2
    fileData += "Created At"+","+"Direction"+","+"Speed"+","+"Humidity"+","+"Temperature"+","+"Dew Point"+","+"Pressure"+","+"Latitude"+","+"Longitude"+"\r\n";
    // all the data in the rest of the rows
    records.forEach(function(rec){
      fileData += rec.createdAt+","+rec.direction+","+rec.speed+","+rec.humidity+","+rec.temp+","+rec.dew+","+rec.pressure+","+rec.latitude+","+rec.longitude+"\r\n";
    });
    this.response.writeHead(200,headers);
    return this.response.end(fileData);
  }
});
//Router.route('ExampleNode');
Router.route('map');
Router.route('humidity');
Router.route('temperature');
Router.route('dewPoint');
Router.route('windSpeed');
Router.route('windDirection');
// This routes to the nodepage 
Router.route('/:name', {
    name: 'NodePage',
    data: function(){
    return Nodes.findOne({name: this.params.name});
    },
    waitOn: function(){
      return Meteor.subscribe('nodes',this.params.name);
  },
});
  