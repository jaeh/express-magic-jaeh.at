'use strict';
var utils = require('./utils');

/*
 * rendering and adds event listeners for the day/night button
*/
(function addDayNightUi () {
  var buttonContainer  = document.createElement('div')
    , button           = document.createElement('a')
    , timeString       = 'day'
    , hours            = new Date().getHours()
    , body             = document.body
    , wrapper          = document.getElementById('wrapper')
    , hasLocalStorage  = utils.localStorage() || false
  ;
  if ( hasLocalStorage ) {
    timeString = localStorage.bodyClass;
  }
  body.classList.remove('day');
  body.classList.remove('night');
  if ( ! timeString ) {
    timeString = ( hours > 19 || hours < 7 ) ? 'night' : 'day';
  }
  body.classList.add(timeString);
  
  if ( hasLocalStorage ) {
    localStorage.bodyClass = timeString;
  }

  buttonContainer.id = 'daynight-container';

  button.classList.add(timeString);
  button.classList.add('icon-lamp');
  button.innerHTML = timeString;
  buttonContainer.appendChild(button);
  wrapper.appendChild(buttonContainer);

  button.addEventListener('click', function (evt) {
    var oldClass = ( body.className.indexOf('day') >= 0 ) ? 'day' : 'night'
      , newClass = ( oldClass === 'day' ) ? 'night' : 'day'
    ;
    
    if ( hasLocalStorage ) {
      localStorage.bodyClass = newClass;
    }
    evt.target.innerHTML = newClass;
    body.classList.remove(oldClass);
    body.classList.add(newClass);
  });
})();

