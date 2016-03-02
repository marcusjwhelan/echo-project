Template.windSpeed.helpers({
  /*currentA: function() {
    if( Router.current().params._id ) {
      let node = Nodes.findOne({ _id: Router.current().params._id });
      if( node ) {
        var tempArray = [];
        if(node.speed.length<20){
          for(i=0; i<node.speed.length;i++){
            tempArray.push(node.speed[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            tempArray.push(node.speed[i]);
          }
        }
        return tempArray;
      }
    }
  },/*
  name: function(){
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        return node.name;
      }
    }
  },
  count: function(){
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        return node.speed.length;
      }
    }
  }*/
});

/*----------------------------------------------------
-------------Added random button and graph------------
------------------------------------------------------*/
var chart1;
function lineChart1(){
  if(Router.current().params._id){

        let node = Nodes.findOne({ name: Router.current().params.name });
        if( node ) {
          // get the name from the current station's page we are on. through the router.
          var nodeName = node.name;
          // grab the last 20 of this Nodes collection
          var speedCollection_20 = Nodes.find({name: nodeName},
                                        {sort:{createdAt: -1},limit: 20}).fetch();
                                        
          /*-----------------------get the directions-----------------------------*/
          // Get the an array of just the directions of these 20 objects
          var speedArray = _.pluck(speedCollection_20,'speed');
          /*----------------------------------------------------------------------*/
          
          /*-----------------------get the time ----------------------------------*/
          // grab the last 20 of this Nodes collection
          // Get the an array of just the directions of these 20 objects
          var timeArray = _.pluck(speedCollection_20,'createdAt');
          /*----------------------------------------------------------------------*/
        }
        
        // create the data array
        var data = [];
        /* ----------------------------------------------------------------------
          lets fill the data array with the total number of objets + 
          the time of each insert in the collection and the data for this graph
        -------------------------------------------------------------------------*/
        for (i = 19; i >= 0; i -= 1) {
          // add to the array
            data.push({
              // add the x value. = to the time
                x: timeArray[i].getTime(),
              // add the y. equal to the incoming data
                y: speedArray[i]
            });
        }

        chart1 = $('#line-chart-container1').highcharts({
          title: {
            text: ' ',
            x: -20 // center?
          },
          xAxis: {
            catagories:[]
          },
          yAxis: {
            title: {
              text: 'Miles per hour'
            },
            plotLines:[{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip:{
            valueSuffix: ' + degrees'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
              name: 'speed',
              data: data
            }],
          credits: {
            enabled: false
          }
        });
      
    }
}

Template.windSpeed.rendered = function(){
  Tracker.autorun(function(){
    lineChart1();
  });
}

/*Template.windSpeed.events({
  // add new random value to this particular node
  'click #add-value1': function(){
    var windS = Math.floor((Math.random()*200)+0);
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = node.speed; 
        Nodes.update({_id: Router.current().params._id},{$push:{speed: 
        {$each: [windS],$position: 0}}});
      }
    }
  }
});*/