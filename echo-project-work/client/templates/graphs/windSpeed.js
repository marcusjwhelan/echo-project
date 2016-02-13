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