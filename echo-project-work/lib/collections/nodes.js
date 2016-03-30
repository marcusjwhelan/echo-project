// Client reference name = create the collecion 'TableName'
Nodes = new Mongo.Collection('nodes');
Names = new Mongo.Collection('names');

// Make a schema 
var Schemas = {};
Schemas.Name = new SimpleSchema({
	name: {
		type: String,
		unique: true,
		max: 20
	},
	createdAt: {
		type: Date,
		autoValue: function(){
			if(this.isInsert){
				return new Date();
			}else if(this.isUpsert){
				return {$setOnInsert: new Date()};
			}else {
				this.unset();
			}
		}
	}
});

Schemas.Node = new SimpleSchema({
	/*name: {
		type: String,
// 		there are more than one of these in the
// 		collection many many
		unique: false,
// 		lets have short names please
		max: 20,
	// how to insert into another collection --*/
		name: { 
			type: String,
			unique: false,
			max: 20,
			autoValue: function() {
				if (this.isInsert) {
			  		try {
						Names.insert({name: this.value});
					} catch (e) {
					}
				}
			}
		},
	//-----------------------------------------}
	
  	createdAt: {
		type: Date,
		autoValue: function(){
			if(this.isInsert){
				return new Date();
			}else if(this.isUpsert){
				return {$setOnInsert: new Date()};
			}else {
				this.unset();
			}
		}
	},
	longitude: {
		type: Number,
		decimal: true
	},
	latitude: {
		type: Number,
		decimal: true
	},
	humidity: {
		type: Number,
		decimal: true
	},
	temp: {
		type: Number,
		decimal: true
	},
	dew: {
		type: Number,
		decimal: true
	},
	pressure: {
		type: Number,
		decimal: true
	},
	speed: {
		type: Number,
		decimal: true
	},
	direction: {
		type: Number,
		decimal: true
	}
});

// Now lets add the schema to the collection
Names.attachSchema(Schemas.Name);
Nodes.attachSchema(Schemas.Node);

/* Lets limit the number of sensor data pieces 
each weather station can store in the colleciton 
by 7500 to 7500 data points a piece. 
*/
//grab entire collection
var nodeCollection = Nodes.find().fetch();
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
  /*
    now since when we add a sensor data point we append 
    to the end of the collection so when we remove we want
    to remove [0] not the end
  */
  if(objectCount>20){
    Nodes.remove({_id: idArray[0]});
  }
}



