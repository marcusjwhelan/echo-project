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
  
  
  
  
  
  