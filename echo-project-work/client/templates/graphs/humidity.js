Template.humidity.helpers({
  humid: function() {
    if( Router.current().params._id ) {
      let node = Nodes.findOne({ _id: Router.current().params._id });
      if( node ) {
        var humidityL = [];
        if(node.humidity.length<20){
          for(i=0; i<node.humidity.length;i++){
            humidityL.push(node.humidity[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            humidityL.push(node.humidity[i]);
          }
        }
        return humidityL;
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
  },*/
  count: function(){
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        return node.humidity.length;
      }
    }
  }
});

/*----------------------------------------------------
-------------Added random button and graph------------
------------------------------------------------------*/
var chart4;
function lineChart4(){
  if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = []; 
        if(node.humidity.length<20){
          for(i=0; i<node.humidity.length;i++){
            data.push(node.humidity[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            data.push(node.humidity[i]);
          }
        }
        chart4 = $('#line-chart-container4').highcharts({
          title: {
            text: ' ',
            x: -20 // center?
          },
          xAxis: {
            catagories:[]
          },
          yAxis: {
            title: {
              text: 'Relative Humidity'
            },
            plotLines:[{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip:{
            valueSuffix: ' + %'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
            name: 'humidity',
            data: data
          }/*if you have more than one plot
          on the graph add a 
          {
            name: 'a;dslkj',
            data: ;;lkj
          },*/],
          credits: {
            enabled: false
          }
        });
      }
    }
}

Template.humidity.rendered = function(){
  Tracker.autorun(function(){
    lineChart4();
  });
}

Template.humidity.events({
  // add new random value to this particular node
  'click #add-value4': function(){
    var rand = Math.floor((Math.random()*(100))+0);
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = node.humidity; 
        Nodes.update({_id: Router.current().params._id},{$push:{humidity: 
        {$each: [rand],$position: 0}}});
      }
    }
  }
});