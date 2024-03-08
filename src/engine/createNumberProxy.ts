export const createProxy = <T>(initialValue: T, handler: (value: T) => any) => {
  let value = initialValue;
  handler(value); // fire the initial event

  const baseValue = {};
  return new Proxy(baseValue, {
    get: function (target, prop) {
      if (prop === 'value') {
        return value;
      }
      return baseValue;
    },
    set: function (target, prop, newValue) {
      if (prop === 'value') {
        value = newValue;
        handler(value);
      }
      return true;
    },
  });
};
