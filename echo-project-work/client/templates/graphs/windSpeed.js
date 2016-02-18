Template.windSpeed.helpers({
  currentA: function() {
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
  },*/
  count: function(){
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        return node.speed.length;
      }
    }
  }
});

/*----------------------------------------------------
-------------Added random button and graph------------
------------------------------------------------------*/
var chart1;
function lineChart1(){
  if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = []; 
        if(node.speed.length<20){
          for(i=0; i<node.speed.length;i++){
            data.push(node.speed[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            data.push(node.speed[i]);
          }
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

Template.windSpeed.rendered = function(){
  Tracker.autorun(function(){
    lineChart1();
  });
}

Template.windSpeed.events({
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
});