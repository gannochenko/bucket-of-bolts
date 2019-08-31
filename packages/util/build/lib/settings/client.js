/* eslint-disable no-underscore-dangle */
export class Settings {
  get(name, defaultValue = null) {
    // eslint-disable-next-line no-undef
    if (window && window.__settings && name in window.__settings) {
      // eslint-disable-next-line no-undef
      return window.__settings[name];
    }

    return defaultValue;
  } // eslint-disable-next-line no-unused-vars,no-empty-function


  async set(name, value) {}

}