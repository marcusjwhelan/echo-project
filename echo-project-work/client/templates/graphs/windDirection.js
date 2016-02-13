Template.windDirection.helpers({
  currentA: function() {
    if( Router.current().params._id ) {
      let node = Nodes.findOne({ _id: Router.current().params._id });
      if( node ) {
        var tempArray = [];
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
        return node.direction.length;
      }
    }
  }
});