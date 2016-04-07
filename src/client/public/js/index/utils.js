'use strict';

// test if localStorage can set
const hasLocalStorage =
  () => {
    const itemKey = 'itemtest235';
    const itemValue = 'mod';

    try {
      window.localStorage.setItem(itemKey, itemValue);

      if (window.localStorage.getItem(itemKey) !== itemValue) {
        throw new Error('localStorage could not set and get the item');
      }

      window.localStorage.removeItem(itemKey);
    } catch (e) {
      return false;
    }

    return true;
  };

export const localStore =
  (key, value = undefined) => {
    // always retest to make sure we do not hit a storage limit
    // or if the user deactivates cookies
    if (!hasLocalStorage() || !key) {
      return;
    }

    // if we have the value passed, we use it to set the item
    if (typeof value !== 'undefined') {
      return window.localStorage.setItem(key, value);
    }

    // return the item from localStorage
    return window.localStorage.getItem(key);
  };

export default localStore;
