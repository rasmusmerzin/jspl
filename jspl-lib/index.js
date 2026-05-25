/** Print without new-line. */
export function print(text) {
  process.stdout.write(text);
}

/** Print with new-line. */
export function echo(text) {
  console.log(text);
}

/**
 * Convert to string.
 * @returns {string}
 */
export function toString(value) {
  return String(value);
}

/**
 * Returns boolean whether value is an array.
 * @returns {boolean}
 */
export function isArray(value) {
  return Array.isArray(value);
}

/**
 * Returns boolean whether value is of class.
 * @returns {boolean}
 */
export function isA(object, klass) {
  return object instanceof klass;
}

/**
 * Represents array list.
 * @template T
 * @typedef {Object} List
 * @property {T[]} items
 */

/**
 * @template T
 * @param {...T} items.
 * @returns {List<T>} list object.
 */
export function List(...items) {
  if (!isA(this, List)) return new List(...items);
  this.items = items;
}

/**
 * Represents array list.
 * @template T, U
 * @param {T[] | List<T> | U} source.
 * @returns {List<T> | List<U>} list object.
 */
List.from = function (source) {
  if (isArray(source)) return List(...source);
  else if (isA(source, List)) return List(...source.items);
  return List(source);
};

List.prototype[Symbol.iterator] = function () {
  const list = this;
  let i = 0;
  return {
    next: function () {
      if (i >= list.items.length) return { done: true };
      else return { value: list.items[i++] };
    },
  };
};

/**
 * Get list length.
 * @returns {number} length
 */
List.prototype.length = function () {
  return this.items.length;
};

/**
 * Get list item at index. Negative indexes are from the end of the list.
 * @param {number} index.
 * @returns {T | null} item.
 */
List.prototype.at = function (index) {
  if (index >= this.items.length || index < -this.items.length) return null;
  if (index < 0) index += this.items.length;
  return this.items[index];
};
