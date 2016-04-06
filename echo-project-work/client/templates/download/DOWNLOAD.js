var sub;
Template.DOWNLOAD.events({
    'click .downloading': function () {
    //all = Nodes.find({name: {$regex: Router.current().params.name}},{sort: {createdAt: -1}}).count();
    //console.log(all);
   // sub.stop();
  }
});
Template.DOWNLOAD.onCreated(function () {
    //sub = this.subscribe('all_node',Router.current().params.name);
    //sub.stop();
});

Template.DOWNLOAD.helpers({
    download: function(){
        return Nodes.findOne();
    }
})