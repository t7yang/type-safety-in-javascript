// ######
// Union Types
// ######

/**
 * Union type with pipe operator
 * @typedef {Date | string | number} MixDate
 */

/**
 * @param {MixDate} date
 * @returns {void}
 */
function showDate(date) {
  // date is Date
  if (date instanceof Date) date;
  // date is string
  else if (typeof date === 'string') date;
  // date is number
  else date;
}

// ######
// Intersection Types
// ######

/**
 * @typedef {Object} Foo
 * @property {string} foo
 */

/**
 * @typedef {Object} Bar
 * @property {string} bar
 */

/** @typedef {Foo & Bar} MixFooBar */

/** @type {MixFooBar} */
const mix = { foo: 'foo', bar: 'bar' };

// ######
// Cast
// ######

/**
 * Force value to some type with cast
 * Don't forget the parentheses
 */
const foo = /** @type {{ foo: string }} */ (JSON.parse('{ "foo": "bar" }'));

/**
 * Cast also support for `const` keyword (TS 4.5)
 * {@link https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#jsdoc-const-and-type-arg-defaults}
 */
const CONST_VALUE = /** @type {const} */ ({ foo: 'bar' });
