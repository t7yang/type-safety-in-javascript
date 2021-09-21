/**
 * Reuse type by import JSDoc type definition from other file
 * @type {import('./object-types').Rgb}
 */
const rgb = { red: 0, green: 0, blue: 0 };

/**
 * Import type from d.ts file
 * @type {import('./pokemon').Pokemon}
 */
const pikachu = { name: 'Pikachu', attack: 55, speed: 90 };

/**
 * Import type from node_modules
 * Make sure install `@types/express` first
 * @type {import('express').RequestHandler}
 * @example signture:
 * const handler: e.RequestHandler<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
 */
const handler = async (req, rep) => {
  const body = req.body;
  rep.status(200).json({ message: 'OK', body });
};
