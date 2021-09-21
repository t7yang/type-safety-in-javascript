// ######
// Typing Object
// ######

/**
 * JSDoc style
 * @typedef {object} Rgb
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 */

/** @type {Rgb} */
const color = { red: 255, green: 255, blue: 255 };

/**
 * TypeScript style
 * @typedef {{ brand: string; color: Rgb }} Car
 */

/** @type {Car} */
const car = {
  brand: 'Some Brand',
  color: { red: 255, green: 255, blue: 255 },
};

// ######
// Typing Array
// ######

/**
 * JSDoc style
 * @type {Array.<Rgb>}
 */
const colors1 = [{ red: 0, green: 0, blue: 0 }];

/**
 * TypeScript style
 * @type {Rgb[]}
 */
const color2 = [{ red: 111, green: 111, blue: 111 }];

/**
 * TypeScript style
 * @type {Array<Rgb>}
 */
const color3 = [{ red: 255, green: 255, blue: 255 }];
