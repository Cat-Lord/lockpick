export type Proxy<T> = {
  value: T;
};
export const createProxy = <T>(initialValue: T, handler: (value: T) => any) => {
  let value = initialValue;
  handler(value); // fire the initial event

  const baseValue: Proxy<T> = {
    value: initialValue,
  };

  return new Proxy<Proxy<T>>(baseValue, {
    get: function (target, prop) {
      if (prop === 'value') {
        return value;
      }
      return baseValue.value;
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
