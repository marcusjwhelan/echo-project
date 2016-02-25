Template.sidebar.helpers({
    nodes: function(){
        /*var distinctEntries = _.uniq(Nodes.find({}, 
        {sort: {name:1}, fields: 
        {name:true}}).fetch().map(function(x) {
        return x.name;
        }), true);*/
        var wow = _.uniq(_.pluck(Nodes.find().fetch(),"name"));
        return wow;
    }
});

Template.sidebar.onCreated(function () {
    this.subscribe('nodes');
});

