const createNumberProxy = (initialValue, handler) => {
  let value = initialValue;
  handler(value); // fire the initial event

  return new Proxy(
    {},
    {
      get: function (target, prop) {
        if (prop === 'value') {
          return value;
        }
        return target[prop];
      },
      set: function (target, prop, newValue) {
        if (prop === 'value') {
          value = newValue;
          handler(value);
        }
        return true;
      },
    }
  );
};
