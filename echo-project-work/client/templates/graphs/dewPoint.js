Template.dewPoint.helpers({
  currentA: function() {
    if( Router.current().params._id ) {
      let node = Nodes.findOne({ _id: Router.current().params._id });
      if( node ) {
        var tempArray = [];
        if(node.dew.length<20){
          for(i=0; i<node.dew.length;i++){
            tempArray.push(node.dew[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            tempArray.push(node.dew[i]);
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
  },*/
  count: function(){
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        return node.dew.length;
      }
    }
  }
});

/*----------------------------------------------------
-------------Added random button and graph------------
------------------------------------------------------*/
var chart5;
function lineChart5(){
  if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = []; 
        if(node.dew.length<20){
          for(i=0; i<node.dew.length;i++){
            data.push(node.dew[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            data.push(node.dew[i]);
          }
        }
        chart5 = $('#line-chart-container5').highcharts({
          title: {
            text: ' ',
            x: -20 // center?
          },
          xAxis: {
            catagories:[]
          },
          yAxis: {
            title: {
              text: 'Degrees Fahrenheit'
            },
            plotLines:[{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip:{
            valueSuffix: ' + F'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
            name: 'dew point',
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

Template.dewPoint.rendered = function(){
  Tracker.autorun(function(){
    lineChart5();
  });
}

Template.dewPoint.events({
  // add new random value to this particular node
  'click #add-value5': function(){
    var rand = Math.floor((Math.random()*(100))-40);
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = node.dew; 
        Nodes.update({_id: Router.current().params._id},{$push:{dew: 
        {$each: [rand],$position: 0}}});
      }
    }
  }
});