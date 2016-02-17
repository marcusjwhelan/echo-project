Template.pressure.helpers({
  currentA: function() {
    if( Router.current().params._id ) {
      let node = Nodes.findOne({ _id: Router.current().params._id });
      if( node ) {
        var tempArray = [];
        if(node.pressure.length<20){
          for(i=0; i<node.pressure.length;i++){
            tempArray.push(node.pressure[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            tempArray.push(node.pressure[i]);
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
        return node.pressure.length;
      }
    }
  }
});

/*----------------------------------------------------
-------------Added random button and graph------------
------------------------------------------------------*/
var chart3;
function lineChart3(){
  if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = []; 
        if(node.pressure.length<20){
          for(i=0; i<node.pressure.length;i++){
            data.push(node.pressure[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            data.push(node.pressure[i]);
          }
        }
        chart3 = $('#line-chart-container3').highcharts({
          title: {
            text: ' ',
            x: -20 // center?
          },
          xAxis: {
            catagories:[]
          },
          yAxis: {
            title: {
              text: 'Pounds per square inch'
            },
            plotLines:[{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip:{
            valueSuffix: ' + PSI'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
            name: 'pressure',
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

Template.pressure.rendered = function(){
  Tracker.autorun(function(){
    lineChart3();
  });
}

Template.pressure.events({
  // add new random value to this particular node
  'click #add-value3': function(){
    var rand = Math.floor((Math.random()*(38-22))+22);
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = node.pressure; 
        Nodes.update({_id: Router.current().params._id},{$push:{pressure: 
        {$each: [rand],$position: 0}}});
      }
    }
  }
});