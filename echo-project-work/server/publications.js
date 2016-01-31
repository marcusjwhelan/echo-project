Meteor.publish('nodes', function(){
    return Nodes.find();
});

Meteor.publish('humidity',function(){
    return Humidity.find();
});