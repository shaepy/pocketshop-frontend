// helper: camelCase -> snake_case
const toSnake = (str) => str.replace(/([A-Z])/g, "_$1").toLowerCase();

// convert top-level keys only, it won't work on nested variables
const keysToSnakeTopLevel = (obj = {}) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [toSnake(k), v]));

export default keysToSnakeTopLevel;
