/*This is the submit event ranther than using
a click event on a button. this will cover all
basses on submiting including enter.*/
Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();//make sure browser doesnt 
  // try and submit the form 
  
// jQuery to populate a new post object. 
    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
/*new code. Instead of directly inserting into
the collection we will call a method that will 
call this method postInsert...Metoer.call calls
thefirst method named in the argument. IE pstInsert*/
    Meteor.call('postInsert',post,function(error,result)
    {
      /*meteor methods always have two arguments
      error and result. so if no error return 
      result*/
      // display the error to the user and abort
      if(error)
        return alert(error.reason);
      // show this result but route anyway
      if (result.postExists)
        alert('This link has already been posted');
      //Router.go('postPage',{_id: result._id});
    });
   Router.go('postsList'); 
  }
/* 
this post.id creates a url path nameformt he
 object's collection id that is in the db
 the go routes it to a URL to browse to.
    post._id = Posts.insert(post);
    Router.go('postPage', post);  old code
  }*/
});