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
  },
  createChart: function(){
        //Use meteor.defer() to create chart after DOM is ready:
        Meteor.defer(function(){
          //create standar highcharts chart withoptions:
          HighCharts.chart({
            
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
        }]
    

          });
        });
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
  
  
  
  
  
  