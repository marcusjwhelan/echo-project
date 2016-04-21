/*----------------------------------------------------
-------------Added random button and graph------------
------------------------------------------------------*/
var chart;
function lineChart(){
        //=============================================
        //  For some reason this make the time correct
        //=============================================
        
        Highcharts.setOptions( Highcharts.theme
        /*{
          global: {
            useUTC: false
          }
        }*/
        );
        //==============================================
        chart = $('#line-chart-container').highcharts({
          /*All Right. Copy and paste here but it works. Now to figure out how
          this works and get my data to load on here.*/
          chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                  /* Here we need to load the data we set, and also reload every 4 seconds*/
                    load: function () {
                      if(Router.current().params.name){
                        let node = Nodes.findOne({ name: Router.current().params.name });
                        if( node ) {
                          // get the name from the current station's page we are on. through the router.
                          var nodeName = node.name;
                          // grab the last 20 of this Nodes collection
                          var newDirectionObject = Nodes.find({name: nodeName},
                                            {sort:{createdAt: -1},limit: 1}).fetch();
                    
                          /*-----------------------get the directions-----------------------------*/
                          // Get the an array of just the directions of these 20 objects
                          var newDirection = _.pluck(newDirectionObject,'direction');
                          /*----------------------------------------------------------------------*/
                          
                          /*-----------------------get the time ----------------------------------*/
                          // grab the last 20 of this Nodes collection
                          // Get the an array of just the directions of these 20 objects
                          var newTime = _.pluck(newDirectionObject,'createdAt');
                          /*----------------------------------------------------------------------*/
                        //}
                          // set up the updating 4 seconds
                          // at position 0
                          var series = this.series[0];
                          
                          setInterval(function () {
                               var x = newTime[0].getTime(); //(new Date()).getTime();
                               var y = newDirection[0]; //this.series.data[19].y;
                               //series.data[0].update([x,y],true,true);
                              //series.addPoint([x, y], false, true);
                          }, 4000);
                          
                        }
                        }
                    }
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
                    text: 'Degree'
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
                        Highcharts.numberFormat(this.y, 2)+ " °";
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
                name: 'Direction',
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
                      var directionCollection_20 = Nodes.find({name: nodeName},
                                        {sort:{createdAt: -1},limit: 20}).fetch();
                                                    
                      /*-----------------------get the directions-----------------------------*/
                      // Get the an array of just the directions of these 20 objects
                      var direction_Array = _.pluck(directionCollection_20,'direction');
                      /*----------------------------------------------------------------------*/
                      
                      /*-----------------------get the time ----------------------------------*/
                      // grab the last 20 of this Nodes collection
                      // Get the an array of just the directions of these 20 objects
                      var timeArray = _.pluck(directionCollection_20,'createdAt');
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
                            y: direction_Array[i]
                        });
                    }
                }
                    return data;
                }())
            }],
            // Added to get rid of the Highcharts
            // water mark.
            credits: {
            enabled: false
          }
          /*----------------------------------------------------*/
          
        });
      }

// Needed to render chart on load of page.
Template.windDirection.rendered = function(){
  Tracker.autorun(function(){
    lineChart();
  });
}

  
  
  
  