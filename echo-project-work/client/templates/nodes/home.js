Meteor.startup(function(){
  WebFontConfig = {
    google: { families: [ 'Droid+Sans::latin', 'Orbitron::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    console.log("async fonts loaded", WebFontConfig);
  })();
});//end of Meteor.startup