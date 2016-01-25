// here we can see the routes being called in order
// so they will load a certain way and not look 
// like a terrible website. the Router.route 
// part is giving the home page a name postsLis
// instead of just / ... also a post page for
// /client/posts/post_page.html's dynamic posts
// creater. this routewill take us there.
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function(){
      return Meteor.subscribe('posts');
  }
});

Router.route('/', {name: 'postsList'});
// The special :_id syntax tells the router two
//things: first, to match any route of the form 
// /posts/xyz/, where “xyz” can be anything at all.
//Second, to put whatever it finds in this “xyz” 
// spot inside an _id property in the router's 
//params array.
Router.route('/posts/:_id', {
  name: 'postPage',
    data: function() { return Posts.findOne(
        // this refers to the currently matched
        //route.this.params access parts of route 
        this.params._id); 
    }
});
// shows the 404 error page fornot just invalid
// routesbut also for postPage route for false 
// null , and undifined or empty data.
Router.onBeforeAction('dataNotFound', {
    only: 'postPage'
})
