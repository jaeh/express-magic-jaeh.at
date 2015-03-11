'use strict';

import {hasLocalStorage} from './utils';

/*
 * day/night button rendering and event listeners 
*/
class DayNightUI {
  constructor() {
    var buttonContainer = document.createElement('div')
      , button          = document.createElement('a')
      , timeString      = 'day'
      , hours           = new Date().getHours()
      , body            = document.body
      , wrapper         = document.getElementById('wrapper')
      , hasLS           = hasLocalStorage()
    ;
    if ( hasLS ) {
      timeString = localStorage.bodyClass;
    }
    body.classList.remove('day');
    body.classList.remove('night');
    if ( ! timeString ) {
      timeString = ( hours > 19 || hours < 7 ) ? 'night' : 'day';
    }
    body.classList.add(timeString);

    if ( hasLS ) {
      localStorage.bodyClass = timeString;
    }

    buttonContainer.id = 'daynight-container';

    button.classList.add(timeString);
    button.classList.add('icon-lamp');
    button.innerHTML = timeString;
    buttonContainer.appendChild(button);
    wrapper.appendChild(buttonContainer);

    button.addEventListener('click', (evt) => {
      var oldClass = ( body.className.indexOf('day') >= 0 ) ? 'day' : 'night'
        , newClass = ( oldClass === 'day' ) ? 'night' : 'day'
      ;
      
      if ( hasLS ) {
        localStorage.bodyClass = newClass;
      }
      evt.target.innerHTML = newClass;
      body.classList.remove(oldClass);
      body.classList.add(newClass);
    });
  }
}

export default DayNightUI;

