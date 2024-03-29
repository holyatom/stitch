export default {
  getValue (keyPath, field) {
    keyPath = keyPath.split('.');

    while (keyPath.length) {
      if (!field) {
        throw new Error(`undefined field`);
      }

      field = field[keyPath.shift()];
    }

    return field;
  },

  updateValue (keyPath, value, object) {
    keyPath = keyPath.split('.');

    while (keyPath.length > 1) {
      if (!object) {
        throw new Error(`undefined field`);
      }

      object = object[keyPath.shift()];
    }

    if (!object) {
      throw new Error(`undefined field`);
    }

    object[keyPath.shift()] = value;
  },

  contains (array, item) {
    return array.indexOf(item) >= 0;
  },

  format (string, ...args) {
    while (args.length) {
      string = string.replace('%s', args.shift());
    }

    return string;
  },

  removeFromArray (arr, item) {
    for (let i = arr.length; i--;) {
      if (arr[i] === item) {
        arr.splice(i, 1);
      }
    }
  },

};
