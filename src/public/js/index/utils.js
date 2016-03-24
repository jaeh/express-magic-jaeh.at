'use strict';

const hasLocalStorage =
  () => {
    try {
      localStorage.setItem('itemtest235', 'mod');
      localStorage.removeItem('itemtest235');
      return true;
    } catch (e) {
      return false;
    }
  };

export const localStore =
  (key, value = undefined) => {
    if (!hasLocalStorage() || !key) {
      return;
    }

    if (typeof value !== 'undefined') {
      return localStorage.setItem(key, value);
    }

    return localStorage.getItem(key);
  };

export default localStore;
