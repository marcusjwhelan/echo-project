
Meteor.subscribe('nodes');
/*Meteor.subscribe('names');*/

/*var nodeCollection = Nodes.find().fetch();
// get the individual names
var nodeNames = _.uniq(_.pluck(nodeCollection,'name'));
// lets loop through the length of all the unique names
for(i=nodeNames.length; i>0;i--){
  //Part 1
  // lets get this indivisual name out of all the names
  var thisName = nodeNames[i-1];
  // Lets get all the objects with this name
  var nodeObjects = Nodes.find({name: thisName}).fetch();
  // lets get the total number of these objects
  var objectCount = Nodes.find({name: thisName}).count();
  
  //Part 2
  // lets grab all the _id's of all these objects
  var idArray = _.pluck(nodeObjects, '_id');
  
    //now since when we add a sensor data point we append 
    //to the end of the collection so when we remove we want
    //to remove [0] not the end
  
  if(objectCount>20){
    Nodes.remove({_id: idArray[0]});
  }
}*/