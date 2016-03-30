//  Old publish code
// Meteor.publish('nodes', function(){
//     return Nodes.find();
// });

// Lets publish only the last 20 points of data
// from each Node
/*var nodeName = node.name;
    var directionCollection_20 = Nodes.find({name: nodeName},
                {sort:{createdAt: -1},limit: 20}).fetch();
    var direction_Array = _.pluck(directionCollection_20,'direction');
    var timeArray = _.pluck(directionCollection_20,'createdAt');

    
    
    'nodes',function(stationId) {
    var myObjectArray = [];
    var nodeCollection=  Nodes.find().fetch();
    var nodeNames = _.uniq(_.pluck(nodeCollection,'name'));
    for(var i=0; i<=nodeNames.length;i++){
        var arrayItem = nodeNames[i];
        var nodeObject = Nodes.findOne({name: arrayItem});
        var allNodeObjects = Nodes.find({name: arrayItem})
        myObjectArray.push(nodeObject);
    }*/

// Publish just the last 20 items of the selected named node
Meteor.publish('nodes',function(nameId){
    /*return Nodes.find();
    var Names = [];
    console.log(Names)
    var nodeCollection=  Nodes.find().fetch();
    var nodeNames = _.uniq(_.pluck(nodeCollection,'name'));
    for(var i= 0; i <= nodeNames.length;i++){
        var arrayItem = nodeNames[i];
        var nodeObjects = Nodes.find({name: arrayItem},{sort:{createdAt: -1},limit:20}).fetch();
        for(var x = 0; x<=nodeObjects.length; x++){
            Names.push(nodeObjects[x]);
        }
        //return Nodes.find({name: name},{sort:{createdAt: -1},limit: 20});
   }
   console.log(Names);
   return Names;
   */
   return Nodes.find({name: {$regex: nameId}},{sort: {createdAt: -1},limit: 20});
   //   return Nodes.find({name: nodeID},{sort: {createdAt: -1},limit: 20})
});
// Publish all from a specific node for download.
Meteor.publish('all_node',function(nameId){
   return Nodes.find({name: {$regex: nameId}},{sort: {createdAt: -1}}); 
});
// Publish all from the names collection
Meteor.publish('names',function(){
    return Names.find();
});




