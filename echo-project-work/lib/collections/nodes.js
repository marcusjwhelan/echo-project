
Nodes = new Mongo.Collection('nodes');
/*Names = new Mongo.Collection('names');*/

// Make a schema 
var Schemas = {};
/*Schemas.Name = new SimpleSchema({
	name: {
		type: String,
		unique: true,
		max: 20
	}	
});*/

Schemas.Node = new SimpleSchema({
	name: {
		type: String,
// 		there are more than one of these in the
// 		collection many many
		unique: false,
// 		lets have short names please
		max: 20,
		/*custom: function(){
			if(this.insert){
				//Names.insert(name: "name");
			}
		}*/
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
/*Names.attachSchema(Schemas.Name);*/
Nodes.attachSchema(Schemas.Node);





