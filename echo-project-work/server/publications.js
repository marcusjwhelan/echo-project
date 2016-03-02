//  Old publish code
// Meteor.publish('nodes', function(){
//     return Nodes.find();
// });

// Lets publish only the last 20 points of data
// from each Node
Meteor.publish('nodes',function(){
    return Nodes.find();
});