export const replaceParams = (str, params) => {
  return str.replace(/:(\w+)/g, (_, key) => {
    return params[key] || `:${key}`;
  });
};
