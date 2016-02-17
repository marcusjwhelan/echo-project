Template.temperature.helpers({
  currentA: function() {
    if( Router.current().params._id ) {
      let node = Nodes.findOne({ _id: Router.current().params._id });
      if( node ) {
        var tempArray = [];
        if(node.temp.length<20){
          for(i=0; i<node.temp.length;i++){
            tempArray.push(node.temp[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            tempArray.push(node.temp[i]);
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
        return node.temp.length;
      }
    }
  }
});

/*----------------------------------------------------
-------------Added random button and graph------------
------------------------------------------------------*/
var chart2;
function lineChart2(){
  if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = []; 
        if(node.temp.length<20){
          for(i=0; i<node.temp.length;i++){
            data.push(node.temp[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            data.push(node.temp[i]);
          }
        }
        chart2 = $('#line-chart-container2').highcharts({
          title: {
            text: ' ',
            x: -20 // center?
          },
          xAxis: {
            catagories:[]
          },
          yAxis: {
            title: {
              text: 'Degree Fahrenheit'
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
            name: 'temperature',
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

Template.temperature.rendered = function(){
  Tracker.autorun(function(){
    lineChart2();
  });
}

Template.temperature.events({
  // add new random value to this particular node
  'click #add-value2': function(){
    var rand = Math.floor((Math.random()*150)-40);
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = node.temp; 
        Nodes.update({_id: Router.current().params._id},{$push:{temp: 
        {$each: [rand],$position: 0}}});
      }
    }
  }
});