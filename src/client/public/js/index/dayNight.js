import { localStore } from './utils';

/*
 * day/night button rendering and event listeners
*/

const buttonContainer = document.createElement('div');
const button = document.createElement('a');
const body = document.body;
const wrapper = document.getElementById('wrapper');

let timeString = localStore('bodyClass') || 'day';
const date = new Date();
const hours = date.getHours();

body.className.replace('day', '');
body.className.replace('night', '');

if (!timeString) {
  timeString =
    hours > 19 || hours < 7
    ? 'night'
    : 'day';
}

body.classList.add(timeString);

localStore('bodyClass', timeString);

buttonContainer.id = 'daynight-container';

button.classList.add(timeString);
button.classList.add('icon-lamp');
button.innerHTML = timeString;
buttonContainer.appendChild(button);
wrapper.appendChild(buttonContainer);

button.addEventListener(
  'click',
  evt => {
    const oldClass =
      body.className.indexOf('day') >= 0
      ? 'day'
      : 'night';

    const newClass =
      oldClass === 'day'
      ? 'night'
      : 'day';

    localStore('bodyClass', newClass);

    evt.target.innerHTML = newClass;
    body.classList.remove(oldClass);
    body.classList.add(newClass);
  }
);
