## How to type efficiently

### Writing types in d.ts file

Typing in TypeScript syntax is more confortable and efficiency compare to JSDoc. You can define your data types in `.d.ts` file and use `import('./path').Type` to import type then type in JSDoc.

```typescript
// color.d.ts
export interface Rgb {
  red: number;
  green: number;
  blue: number;
}

export interface Rgbs extends Rgb {
  alpha: number;
}

export type Color = Rgb | Rbgs | string;
```

```javascript
// here the equivalent types define in JSDocs syntax
// its much more verbose

/**
 * @typedef {object} Rgb
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 */

/**
 * @typedef {object} Alpha
 * @property {number} alpha
 */

/** @typedef {Rgb & Alpha} Rgba */

/** @typedef {Rgb | Rgba | string} Color */
```

```javascript
// color.js import type from color.d.ts
/** @type {import('./color').Color} */
const color = { red: 255, green: 255, blue: 255, alpha: 0.1 };
```

### Don't forget Definitely Typed

You don't need to define every data or function in yourself, even you don't use TypeScript, you still can use the type definition provide by [Definitely Typed](https://www.typescriptlang.org/dt/search?search=).

For example, if you developing a Node.js API application with express.js in JavaScript, don't forget to install `@types/node` and `@types/express`.

```bash
$ npm install -D @types/node @types/express
```

In your js file:

```javascript
/** @type {import('express').RequestHandler} */
const handler = async (req, rep) => {
  // req and rep is now with type
};
```

### Convert JSON data into types

Not only for library, something you need to type your API response data, how to make this process more efficiently.

You can simply copy to response data in JSON form then use below tools to help convert JSON to type.

[transform](https://transform.tools/json-to-jsdoc) is an online converter which can help user convert many source format to many output format including JSON to JSDoc and TypeScript definition.

```json
{
  "red": 255,
  "green": 255,
  "blue": 255
}
```

The above JSON data can convert to JSDoc definition

```javascript
/** @typedef {Object} json
 * @property {Number} blue
 * @property {Number} green
 * @property {Number} red
 */
```

or TypeScript definition

```typescript
export interface Root {
  red: number;
  green: number;
  blue: number;
}
```

You can change the type's name and paste this code into your `.js` or `d.ts` file.

[JSON to TS](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts) is an extension for VSCode can help to convert JSON data to TypeScript definition.

The main advantage for this extension is it can handle nested JSON data. However, transform.tools unavailable now.
