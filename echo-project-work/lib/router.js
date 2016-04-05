Router.configure({
  // we use the  layout template to define the layout for the entire app
  layoutTemplate: 'layout',
  // the notFound template is used for unknown routes and missing lists
  notFoundTemplate: 'notFound',
  // show the loading template whilst the subscriptions below load their data
  loadingTemplate: 'loading',
  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  //waitOn: function() {
  //  return [
  //    Meteor.subscribe('publicLists'),
  //    Meteor.subscribe('privateLists')
  //  ];
  //}
  
});

//dataReadyHold = null;

//if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  //dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  //Router.onBeforeAction('loading', {except: ['join', 'signin']});
  //Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
//}

Router.route('/',{name: 'Home'});
// This will be here to deal with inserts form other destinations
Router.route('/insert',{
    where: 'server',
    action: function(){
      var show = Nodes.find({name: "St. Louis"}).count();
      console.log(show);
      var show1=Nodes.find({name: "St. Louis"},{sort: {createdAt: 1},limit: 1}).fetch();
      console.log(show1);
      if(show> 30){
        var last_node = Nodes.findOne({name: "St. Louis"},{sort: {createdAt: 1}});
        Nodes.remove({_id: last_node._id});
      }
      var name = this.params.query.name;
      var long = parseFloat(this.params.query.long)
      var lat = parseFloat(this.params.query.lat)
      var hum = parseFloat(this.params.query.hum)
      var temp = parseFloat(this.params.query.temp)
      var dew = parseFloat(this.params.query.dew)
      var pres = parseFloat(this.params.query.pres)
      var speed = parseFloat(this.params.query.speed)
      var dir = parseFloat(this.params.query.dir)
      Nodes.insert({name: name, dew: dew,
      temp: temp, direction: dir, speed: speed,
      longitude: long,latitude: lat, 
      humidity: hum, pressure: pres});
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
  


  
/*
Router.route('listsShow', {
  path: '/lists/:_id',
  // subscribe to todos before the page is rendered but don't wait on the
  // subscription, we'll just render the items as they arrive
  onBeforeAction: function () {
    this.todosHandle = Meteor.subscribe('todos', this.params._id);

    if (this.ready()) {
      // Handle for launch screen defined in app-body.js
      dataReadyHold.release();
    }
  },
  data: function () {
    return Lists.findOne(this.params._id);
  },
  action: function () {
    this.render();
  }
});

Router.route('home', {
  path: '/',
  action: function() {
    Router.go('listsShow', Lists.findOne());
  }
});*/


