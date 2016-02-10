//Example given by Stephen Woods. Stackoverflow answer to my question.
Template.graph.helpers({
  humid: function() {
    if( Router.current().params._id ) {
      let node = Nodes.findOne({ _id: Router.current().params._id });
      if( node ) {
        return node.humidity;
      }
    }
  }
});
