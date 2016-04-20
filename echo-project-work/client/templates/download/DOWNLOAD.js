
Template.DOWNLOAD.helpers({
    download: function(){
        return Nodes.findOne({name: Router.current().params.name},{sort: {createdAt: -1}});
    }
});