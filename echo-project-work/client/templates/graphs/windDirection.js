Template.windDirection.helpers({
  // This function returns only 20 points of the array and all if <20
  currentA: function() {
    if( Router.current().params._id ) {
      let node = Nodes.findOne({ _id: Router.current().params._id });
      if( node ) {
        var tempArray = [];
        //var tims = Template.instance().seconds.get();
        if(node.direction.length<20){
          for(i=0; i<node.direction.length;i++){
            tempArray.push(node.direction[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            tempArray.push(node.direction[i]);
          }
        }
        return tempArray;
      }
    }
  },/*  This function returns the array length*/
  count: function(){
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        return node.direction.length;
      }
    }
  }
});
/*----------------------------------------------------
-------------Added random button and graph------------
------------------------------------------------------*/
var chart;
function lineChart(){
  if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = []; 
        if(node.direction.length<20){
          for(i=0; i<node.direction.length;i++){
            data.push(node.direction[i]);
          }
        }
        else{
          for(i=0; i<20;i++){
            data.push(node.direction[i]);
          }
        }
        chart = $('#line-chart-container').highcharts({
          title: {
            text: ' ',
            x: -20 // center?
          },
          xAxis: {
            catagories:[]
          },
          yAxis: {
            title: {
              text: 'Degree'
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
            name: 'Direction',
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

Template.windDirection.rendered = function(){
  Tracker.autorun(function(){
    lineChart();
  });
}

Template.windDirection.events({
  // add new random value to this particular node
  'click #add-value': function(){
    var windD = Math.floor((Math.random()*360)+0);
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = node.direction; 
        Nodes.update({_id: Router.current().params._id},{$push:{direction: 
        {$each: [windD],$position: 0}}});
      }
    }
  }
});





/*
Template.windDirection.created = function(){
  var self = this;
  this.seconds = new ReactiveVar(0);
  this.handle=Meteor.setInterval((function(){
    self.seconds.set(self.seconds.get()+1);
  }),1000);
};
// this is here to stop doing the operation when 
// the page is left. 
Template.windDirection.destroyed = function(){
  Meteor.cearInterval(this.handle);
};*/
  
  
  
  
  
  