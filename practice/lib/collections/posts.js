// This is our publishing of posts that are 
// sent to the client. these posts are stored
// on mongodb. they are posted at.
// /client/posts/post_list.html but they are 
// posted there by the js code in
// /client/posts/post_list.js
Posts = new Mongo.Collection('posts');

// Need this to post after we removed insecure
Posts.allow({// allows users to edit Posts collection
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});