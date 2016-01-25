// Here we can see that postItem is call and
// is referencing the postItem name tag in 
// /client/posts/post_item.html the 
// html pulls the domain,title and url to 
// use them in the html but it is made here. 
// the a is a creation of an <a> element for 
// html. you can see the url next to the 
// link. this is what that does. 
Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});