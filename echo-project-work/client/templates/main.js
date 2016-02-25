
Meteor.subscribe('nodes');
/*Meteor.subscribe('names');*/

console.log(Nodes.find().fetch());