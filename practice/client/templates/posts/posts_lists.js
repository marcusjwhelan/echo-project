// Here Template connects to postsList to
// helpers to find the posts in the mongodb
// database. We had to publish them first
// in /lib/collections/posts.js and 
// subscribe to the data in the client at
// /client/main.js toeven recieve these posts.
// but here Posts.find() finds them and returns
// them. each post is done one at a time at.
// /client/posts/posts_list.html
Template.postsList.helpers({
    posts: function(){
        return Posts.find();
    }
})