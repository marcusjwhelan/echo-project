// This is our publishing of posts that are 
// sent to the client. these posts are stored
// on mongodb. they are posted at.
// /client/posts/post_list.html but they are 
// posted there by the js code in
// /client/posts/post_list.js
Posts = new Mongo.Collection('posts');

/*// Need this to post after we removed insecure
Posts.allow({
// allows users to edit Posts collection
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});
Removed after a bit to make way for this since they
are bypassed by the method in Post_submit.js the
Meteor.call postInsert method*/
Meteor.methods({
  /*This makes sure that the title , and URL are
  in fact strings*/
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });
    /*here we have a delay to for the method call
    postAttribues so that we can make the client
    simulate the actions instantly then call this
    method so not to wait for server operations
    to see results of posting*/
     if (Meteor.isServer) {
      postAttributes.title += "(server)";
      // wait for 5 seconds
      Meteor._sleepForMs(5000);
    } else {
      postAttributes.title += "(client)";
    }
    /*Here this is the code to prevent duplicates
    with a check on the string to string basis*/
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }
    /*and now we can use postAttributs on
    any js object to see if in fact it is a string*/
    var user = Meteor.user();
    // _.extend simply lets u extend and object.
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date() // here is the submit time
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});