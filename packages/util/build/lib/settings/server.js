export class Settings {
  async get(name, defaultValue = null) {
    if (name in process.env) {
      return process.env[name];
    } // network.port => NETWORK__PORT


    const otherName = name.replace(/\./g, '__').toUpperCase();

    if (otherName in process.env) {
      return process.env[otherName];
    }

    return defaultValue;
  } // eslint-disable-next-line no-unused-vars,no-empty-function


  async set(name, value) {}

  async forward(list) {
    const result = {};

    if (list && list.length) {
      // todo: use Promise.all() here
      for (let i = 0; i < list.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        result[list[i]] = await this.get(list[i]);
      }
    }

    return result;
  }

}