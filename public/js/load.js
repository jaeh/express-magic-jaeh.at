(function load() {
  'use strict';
  var script = document.createElement('script');
  var xmlHttp = null;
      xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", '/js/main.js', false )
      xmlHttp.send( null );
  script.innerHTML = xmlHttp.responseText;
  document.body.appendChild(script);
})();
