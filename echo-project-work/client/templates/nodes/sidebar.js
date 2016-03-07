Template.sidebar.helpers({
    nodes: function(){
        //make array to hold objects
        var myObjectArray = [];
        // grab entire collection
        var nodeCollection=  Names.find().fetch();
        // Get the unique names from collection
        var nodeNames = _.uniq(_.pluck(nodeCollection,'name'));
        // find the Node with that name and
        // place into object array loop till done
        for(i=nodeNames.length; i>0;i--){
            var arrayItem = nodeNames[i-1];
            var nodeObject = Names.findOne({name: arrayItem});
            myObjectArray.push(nodeObject);
        }
        return myObjectArray;
        
    }
});
Template.sidebar.onCreated(function () {
    this.subscribe('names');
});

