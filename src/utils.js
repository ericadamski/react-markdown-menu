/**
 *
 * Taken from https://github.com/paypal/downshift/blob/master/src/utils.js
 * Many thanks to [@kentcdodds](https://twitter.com/kentcdodds) 👏
 *
 * */

export function noop() {}

/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls
 * `event.preventDefault()`. Not sure this is the best
 * way to do this, but it seems legit...
 * @param {Function} fns the event handler functions
 * @return {Function} the event handler to add to an element
 */
export function composeEventHandlers(...fns) {
  return (event, ...args) =>
    fns.some(fn => {
      fn && fn(event, ...args);
      return event.defaultPrevented;
    });
}

/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @param {*} defaultValue the value if arg is falsey not defined
 * @return {*} the arg or it's first item
 */
export function unwrapArray(arg, defaultValue) {
  arg = Array.isArray(arg) ? /* istanbul ignore next (preact) */ arg[0] : arg;
  if (!arg && defaultValue) {
    return defaultValue;
  } else {
    return arg;
  }
}

/**
 * @param {Object} element (P)react element
 * @return {Boolean} whether it's a DOM element
 */
export function isDOMElement(element) {
  /* istanbul ignore if */
  if (element.nodeName) {
    // then this is preact
    return typeof element.nodeName === 'string';
  } else {
    // then we assume this is react
    return typeof element.type === 'string';
  }
}

/**
 * @param {Object} element (P)react element
 * @return {Object} the props
 */
export function getElementProps(element) {
  // props for react, attributes for preact
  return (
    element.props || /* istanbul ignore next (preact) */ element.attributes
  );
}
