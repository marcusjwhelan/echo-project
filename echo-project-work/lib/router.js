
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){
        return Meteor.subscribe('nodes');
    }
});

Router.route('/', function () {
  this.render('layout');
});

Router.onBeforeAction('datanotFound',{
    only: 'home'
})
 
