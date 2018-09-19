/**
 * @file Holds miscellaneous helpers
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */

/**
 * Async/await version of setTimeout
 * @param {number} ms
 * @returns {function}
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Async/await version of setTimeout
 * @param {string} logMessage to display
 * @returns {function} target
 */
export const log = logMessage => {
  return function() {
    const descriptor = arguments[2];
    const originalMethod = descriptor.value;

    descriptor.value = function(...args) {
      console.log("[LOG]", logMessage);
      return originalMethod.call(this, ...args);
    };

    return descriptor;
  };
};

/**
 * Checks is string equal uppercase
 * @param {string} str String to check
 * @returns {boolean}
 */
export const isUpperCase = str => {
  return str ? str === str.toUpperCase() : false;
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
