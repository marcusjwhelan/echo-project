Meteor.publish('nodes', function(){
    return Nodes.find();
});