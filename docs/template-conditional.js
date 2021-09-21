// ######
// Template (Generic) Types
// ######

/**
 * @template T
 * @param {T} data
 * @returns {Promise<T>}
 * @example signature:
 * function toPromise<T>(data: T): Promise<T>
 */
function toPromise(data) {
  return Promise.resolve(data);
}

/**
 * Restrict template by types
 * @template {string|number|symbol} T
 * @template Y
 * @param {T} key
 * @param {Y} value
 * @returns {{ [K in T]: Y }}
 * @example signature:
 * function toObject<T extends string | number | symbol, Y>(key: T, value: Y): { [K in T]: Y; }
 */
function toObject(key, value) {
  return { [key]: value };
}

// ######
// Conditional Types
// ######

/**
 * @template {string | number} T
 * @param {T} data
 * @returns {T extends string ? number : string}
 * @example signature:
 * function convert<T extends string | number>(data: T): T extends string ? number : string
 */
function convert(data) {
  return typeof data === 'string' ? Number(data) : String(data);
}
