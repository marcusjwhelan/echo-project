Template.graph.helpers({
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
  },
  name: function(){
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        return node.name;
      }
    }
  },
  count: function(){
    if(Router.current().params._id){
      let node = Nodes.findOne({_id: Router.current().params._id});
      if(node){
        return node.humidity.length;
      }
    }
  }
});

