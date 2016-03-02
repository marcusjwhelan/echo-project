Template.windDirection.helpers({
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
var chart;
function lineChart(){
        //=============================================
        //  For some reason this make the time correct
        //=============================================
        
        
        
        
  Highcharts.theme = {
    // OSU ORANGE
    colors: ['rgb(217,89,0)'],
    chart: {
      backgroundColor: '#252525'
      /*{
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgb(96, 96, 96)'],
            [1, 'rgb(16, 16, 16)']
          ]
      }*/,
      borderWidth: 0,
      borderRadius: 0,
      plotBackgroundColor: null,
      plotShadow: false,
      plotBorderWidth: 0
    },
    title: {
      style: {
        color: '#FFF',
        font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: '#DDD',
        font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
    },
    xAxis: {
      gridLineWidth: 0,
      lineColor: '#999',
      tickColor: '#999',
      labels: {
        style: {
          color: '#999',
          fontWeight: 'bold'
        }
      },
      title: {
        style: {
          color: '#AAA',
          font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
      }
    },
    yAxis: {
      alternateGridColor: null,
      minorTickInterval: null,
      gridLineColor: 'rgba(255, 255, 255, .1)',
      minorGridLineColor: 'rgba(255,255,255,0.07)',
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        style: {
          color: '#999',
          fontWeight: 'bold'
        }
      },
      title: {
        style: {
          color: '#AAA',
          font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
      }
    },
    legend: {
      itemStyle: {
        color: '#CCC'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#333'
      }
    },
    labels: {
      style: {
        color: '#CCC'
      }
    },
    tooltip: {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(96, 96, 96, .8)'],
          [1, 'rgba(16, 16, 16, .8)']
        ]
      },
      borderWidth: 0,
      style: {
        color: '#FFF'
      }
    },
    plotOptions: {
      series: {
        nullColor: '#444444'
      },
      line: {
        dataLabels: {
          color: '#CCC'
        },
        marker: {
          lineColor: '#333'
        }
      },
      spline: {
        marker: {
          lineColor: '#333'
        }  
      },
      scatter: {
        marker: {
          lineColor: '#333'
        }
      },
      candlestick: {
        lineColor: 'white'
      }
    },
    toolbar: {
      itemStyle: {
        color: '#CCC'
      }
    },
    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
          hoverSymbolStroke: '#FFFFFF',
            theme: {
              fill: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                    [0.4, '#606060'],
                    [0.6, '#333333']
                  ]
              },
              stroke: '#000000'
            } 
      }
    },
    global: {
            useUTC: false
          }
  };
        
        
        
        
        
        
        
        
        
        
        
        
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
                        }
                          // set up the updating 4 seconds
                          // at position 0
                          var series = this.series[0];
                          console.log(this.series[0]);
                          setInterval(function () {
                               var x = newTime[0].getTime();
                               var y = newDirection[0];
                              series.addPoint([x, y], true, true);
                          }, 200000);
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
                            y: direction_Array[i]
                        });
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
/*
Template.windDirection.events({
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
  
  
  
  
  