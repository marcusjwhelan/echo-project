Template.dewPoint.helpers({
  /*currentA: function() {
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
  },*//*
  name: function(){
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        return node.name;
      }
    }
  },*/
});

/*----------------------------------------------------
-------------Added random button and graph------------
------------------------------------------------------*/
var chart5;
function lineChart5(){
  if(Router.current().params){
        //=============================================
        //  For some reason this make the time correct
        //=============================================
        Highcharts.setOptions( Highcharts.theme
          /*{
          global: {
            useUTC: false
          }
        }*/);
        //==============================================
        chart5 = $('#line-chart-container5').highcharts({
          /*All Right. Copy and paste here but it works. Now to figure out how
          this works and get my data to load on here.*/
          chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                      if(Router.current().params.name){
                        let node = Nodes.findOne({ name: Router.current().params.name });
                        if( node ) {
                          // get the name from the current station's page we are on. through the router.
                          var nodeName = node.name;
                          // grab the last 20 of this Nodes collection
                          var newdewObject = Nodes.find({name: nodeName},
                              {sort:{createdAt: -1},limit: 1}).fetch();
    
                          /*-----------------------get the dews-----------------------------*/
                          // Get the an array of just the dews of these 20 objects
                          var newdew = _.pluck(newdewObject,'dew');
                          /*----------------------------------------------------------------------*/
                          
                          /*-----------------------get the time ----------------------------------*/
                          // grab the last 20 of this Nodes collection
                          // Get the an array of just the dews of these 20 objects
                          var newTime = _.pluck(newdewObject,'createdAt');
                          /*----------------------------------------------------------------------*/
                        }
                          // set up the updating 4 seconds
                          // at position 0
                          var series = this.series[0];

                          setInterval(function () {
                               var x = newTime[0].getTime();//(new Date()).getTime();
                               var y = newdew[0]; //this.series.data[19].y;
                               //series.addPoint([x, y], true, true);
                          }, 4000);
                        }
                    }
                    /*load: function () {
                        // set up the updating of the chart each second
                        // at position 0
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.floor((Math.random()*(100))+0);
                                
                            series.addPoint([x, y], true, true);
                        }, 4000);
                    }*/
                }
            },
            title: {
                text: ' '
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Dew Point'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                  /*This.series.name gets Line name made in series below
                  Next formats the date and time which is pushed in the
                  series = x. y= the random data point*/
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%d-%m-%Y %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            /* This shows the name of the line*/
            legend: {
                enabled: false
            },
            // Not sure?
            exporting: {
                enabled: false
            },
            series: [{
              // Line name
                name: 'Random data',
                /* Here is where the data is coming form
                Make sure to retrieve needed data for the
                graph here.*/
                data: (function () {
                    // generate an array of random data
                    let node = Nodes.findOne({ name: Router.current().params.name });
                    if( node ) {
                      // get the name from the current station's page we are on. through the router.
                      var nodeName = node.name;
                      // grab the last 20 of this Nodes collection
                      var dewCollection_20 = Nodes.find({name: nodeName},
                                {sort:{createdAt: -1},limit: 20}).fetch();
                      var ca = Nodes.find({name: nodeName},{sort:{createdAt: -1}}).count();
                      console.log(ca + "hmm");
                      /*-----------------------get the dews-----------------------------*/
                      // Get the an array of just the dews of these 20 objects
                      var dew_Array = _.pluck(dewCollection_20,'dew');
                      /*----------------------------------------------------------------------*/
                      
                      /*-----------------------get the time ----------------------------------*/
                      // grab the last 20 of this Nodes collection
                      // Get the an array of just the dews of these 20 objects
                      var timeArray = _.pluck(dewCollection_20,'createdAt');
                      /*----------------------------------------------------------------------*/
                    
                    
                    // create the data array
                    var data = [];
                    /* ----------------------------------------------------------------------
                      lets fill the data array with the total number of objets + 
                      the time of each insert in the collection and the data for this graph
                    -------------------------------------------------------------------------*/
                    for (var i = 19; i >= 0; i -= 1) {
                      // add to the array
                        data.push({
                          // add the x value. = to the time
                            x: timeArray[i].getTime(),
                          // add the y. equal to the incoming data
                            y: dew_Array[i]
                        });
                    }
                }
                    return data;
                }())
                /*data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.floor((Math.random()*(100))+ 0)
                        });
                    }
                    return data;
                }())*/
            }],
            // Added to get rid of the Highcharts
            // water mark.
            credits: {
            enabled: false
          }
          /*----------------------------------------------------*/
          
        });
      }
}

// Needed to render chart on load of page.
Template.dewPoint.rendered = function(){
  Tracker.autorun(function(){
    lineChart5();
  });
}


/*
Template.dewPoint.events({
  // add new random value to this particular node
  'click #add-value5': function(){
    var rand = Math.floor((Math.random()*(100))+ 0);
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        var data = node.dew; 
        Nodes.update({_id: Router.current().params._id},{$push:{dew: 
        {$each: [rand],$position: 0}}});
      }
    }
  }
});*/