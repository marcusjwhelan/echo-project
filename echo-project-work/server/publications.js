
// Publish just the last 20 items of the selected named node
Meteor.publish('nodes',function(nameId){
   return Nodes.find({name: {$regex: nameId}},{sort: {createdAt: -1},limit: 20});
});
// Publish all from a specific node for download.
Meteor.publish('all_node',function(nameId){
   return Nodes.find({name: {$regex: nameId}},{sort: {createdAt: -1}}); 
});
// Publish all from the names collection
Meteor.publish('names',function(){
    return Names.find();
});

