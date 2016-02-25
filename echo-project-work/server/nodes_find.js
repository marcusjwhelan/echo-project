/*if(Nodes.find().count() === 0){
    Nodes.insert({
        _id: "OSUNode1",
        _id: "OSU Node 1",
        gps: '134.234.78.545',
        humidity: [80,81,82,83,85,86,87,88,89,88],
        temp: [25,56,67,65,65,66,45,50],
        dew: [80,87,89,86,87,89,80,84,79],
        speed: [100,101,103,110,150,134,112,123,124],
        direction: [120,90,180,275,360,120,123,124,150],
        pressure: [33,32,33,34,35,32,32,31,32,31,33,35]
    
    });
    Nodes.insert({
        _id: "StormNode1",
        name: "Storm Node 1",
        gps: '123.323.12.321',
        humidity: [77,76,78,76,76,75,77,78,78,79,80],
        temp: [25,56,67,65,65,66,45,50],
        dew: [80,87,89,86,87,89,80,84,79],
        speed: [100,101,103,110,150,134,112,123,124],
        direction: [120,90,180,275,360,120,123,124,150],
        pressure: [33,32,33,34,35,32,32,31,32,31,33,35]
    });
}
*/
var name1 = { name: "OSU Node 1"};
var name2 = { name: "Tulsa Node"};

var sampleInput_1 ={
  name: "OSU Node 1",
  longitude: -97.052,
  latitude: 36.118,
  humidity: 80,
  temp: 89,
  dew: 29,
  pressure: 34,
  speed: 20,
  direction: 138
};
var sampleInput_2 ={
  name: "Tulsa Node",  
  longitude: -95.982,
  latitude: 36.137,
  humidity: 78,
  temp: 80,
  dew: 20,
  pressure: 32,
  speed: 12,
  direction: 60
};
var sampleInput_3 ={
  name: "OSU Node 1",
  longitude: -97.052,
  latitude: 36.118,
  humidity: 20,
  temp: 88,
  dew: 28,
  pressure: 34,
  speed: 18,
  direction: 133
};
var sampleInput_4 ={
  name: "Tulsa Node",  
  longitude: -95.982,
  latitude: 36.137,
  humidity: 78,
  temp: 80,
  dew: 20,
  pressure: 32,
  speed: 12,
  direction: 60
};

if(Nodes.find().count() === 0){
    Nodes.insert(sampleInput_1,{
      validate: false
    });
    Nodes.insert(sampleInput_2,{
      validate: false
    });
  Nodes.insert(sampleInput_3,{
      validate: false
    });
    Nodes.insert(sampleInput_4,{
      validate: false
    });
};
/*if(Names.find().count()===0){
  Names.insert(name1,{validate: true});
  Names.insert(name2,{validate: true});
}
*/




