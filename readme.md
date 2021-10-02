# Type safety in JavaScript with JSDoc and VSCode

TypeScript is one of the popular transpile language to JavaScript that provide type safety feature, but not only TypeScript itself can get the benefit from type safety, but the entire JavaScript community.

This article aim to introduce how to make JavaScript project type safe with [JSDoc](https://jsdoc.app/), [TypeScript](https://www.typescriptlang.org/), and [VSCode](https://code.visualstudio.com/). Not only make your project more robust, but these technique also can enhance your DX. The premise is that you don't think type is a burden.

This article cover about:

- Commonly used of JSDoc tags for type definition.
- How to reuse type by import from other files.
- How to type your data efficiently with converter.
- How to setup and enabled statically type checking in VSCode and compile time checking with `tsc`.

This article NOT cover about:

- What is JavaScript or TypeScript type.
- How JavaScript or TypeScript type system work.

> **NOTE**: Every code snippet in this article can found in this [repository](https://github.com/t7yang/type-safety-in-javascript)

## Type primitive

```javascript
/** @type {string} */
const str = 'string';

/** @type {number} */
const num = 123;

/** @type {boolean} */
const bool = true;

/** @type {null} */
const nul = null;

/** @type {undefined} */
const und = undefined;

/** @type {symbol} */
const sym = Symbol('foo');

/** @type {*} */
const jsDocAny = 'any value';

/** @type {any} */
const tsAny = 'any value';
```

> **NOTE**:
> In JSDoc, capital type like `String` is same as `string`, both mean primitive string.

## Type object

Object value including object, array, and function, I'll talk about function later.

### Object value

```javascript
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
```

### Array value

```javascript
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
```

## Type function

```javascript
/**
 * JSDoc style named function type
 * @callback Add
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */

/** @type {Add} */
const add = (x, y) => x + y;

/**
 * TypeScript style inline function type
 * @typedef {(x: number, y: number) => number} TsAdd
 */

/** @type {TsAdd} */
const tsAdd = (x, y) => x + y;

/**
 * JSDoc style type function with function declaration
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function addDec(x, y) {
  return x + y;
}
```

### Optional parameter

```javascript
/**
 * JSDoc style optional parameter
 * @param {number} [x] optional
 * @param {number=} y number or undefined
 * @param {number} [z=1] optional with default (default not show in type hint)
 */
function jsDocOptional(x, y, z = 1) {}
```

### Rest parameter

```javascript
/**
 * JSDoc style rest parameter
 * @param {...number} num
 * @returns {number}
 */
function sum(...num) {
  return num.reduce((s, v) => s + v, 0);
}

/**
 * TypeScript style rest parameter
 * @param {number[]} num
 */
function tsSum(...num) {
  return num.reduce((s, v) => s + v, 0);
}
```

### Return type

```javascript
/**
 * No explicit return value
 * @returns {void}
 */
function noReturn() {
  console.log('no explicit return');
}

/**
 * Function never return
 * @returns {never}
 */
function neverReturn() {
  throw Error('ERRORRRRR');
}
```

## Type class and `this`

```javascript
class Computer {
  /**
   * @readonly Readonly property
   * @type {string}
   */
  CPU;

  /**
   * _clock type automatic infer from default value
   * @private Private property
   */
  _clock = 3.999;

  /**
   * @param {string} cpu
   * @param {number} clock
   */
  constructor(cpu, clock) {
    this.CPU = cpu;
    this._clock = clock;
  }

  /**
   * @param {string} cpu
   * @returns {void}
   */
  change(cpu) {
    // @ts-expect-error
    this.CPU = cpu; // can not reasign readonly
  }
}

/**
 * Class is both value and type
 * @type {Computer}
 */
const computer = new Computer('Foo', 2.999);

/**
 * @this {HTMLInputElement}
 * @returns {void}
 */
function handleChange() {
  console.log(`The input element's value is ${this.value}`);
}

document.querySelector('input').addEventListener('change', handleChange);
```

### Type literal value

```javascript
/**
 * Specify string type
 * @typedef {'RED'|'GREEN'|'BLUE'} RgbLabel
 */

/** @type {RgbLabel} */
const label = 'BLUE';

/**
 * Enumerate values type
 * @enum {number}
 */
const Status = {
  on: 1,
  off: 0,
};

/** @type {Status} */
const off = Status.on;
```

## Advanced types

Some worth noting advanced types.

### Union type

```javascript
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
```

### Intersection type

```javascript
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
```

### Cast

```javascript
/**
 * Force value to some type with cast
 * Don't forget the parenthesis
 */
const foo = /** @type {{ foo: string }} */ (JSON.parse('{ "foo": "bar" }'));

/**
 * Cast also support for `const` keyword (TS 4.5)
 * {@link https://github.com/microsoft/TypeScript/pull/45464}
 */
const CONST_VALUE = /** @type {const} */ {
  foo: 'bar',
};
```

## Template and conditional type

Template and conditional type is more used by library creators, it make typing more flexible.

### Template (generic type)

```javascript
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
```

### Conditional type

```javascript
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
```

## Reuse (import) types

You don't need type in every file, types can be reuse by import from other files.

```javascript
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
 * @example signature:
 * const handler: e.RequestHandler<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
 */
const handler = async (req, rep) => {
  const body = req.body;
  rep.status(200).json({ message: 'OK', body });
};
```

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

Not only for library, sometime you need to type your API response data with a lot of properties, how to make this process more efficiently.

You can simply copy to response data in JSON form then use below tools to help convert JSON to type, don't forget to make sure the type generate by tools below fit the actual data from the server.

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

## How to enable type checking

Even you already typed your data and function, still VSCode can't give you any warning or error message if you make any mistake.

There are two options to enabled type checking in VSCode, by file or by project folder, both needs manually enabled.

### Checking by file

To enabled type checking for specify file, add comment `// @ts-check` at the first line of file.

```javascript
// @ts-check

// @ts-expect-error
/** @type {string} */
const name = 123;
```

Enabled type checking by file is very helpful for progressively enhance your project's type safety.

### Checking by project folder

Instead of manually setup for each file, you can use [jsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) to setup type checking for your whole project.

You can manually create a `jsonconfig.json` file on the root of the project folder or you can run below command to create a `tsconfig.json` then rename it to `jsonconfig.json`.

```bash
$ npx typescript --init
```

Or you can globally install typescript, then use this command:

```bash
$ npm install -g typescript

$ tsc --init
```

Then, rename `tsconfig.json` to `jsconfig.json`

Open the file, you will see a lot of options, most of them disabled by default.

Don't be scare, all you need to do is just uncomment the "JavaScript Support" options and explicitly specify you source path:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "maxNodeModuleJsDepth": 1
  },
  "input": ["src"]
}
```

Create a JavaScript file under source folder, make a silly mistake, VSCode now give you a warn.

```javascript
/** @type {string} */
const foo = 123; // Error: Type 'number' is not assignable to type 'string'.
```

### Setup commands for type checking

A project can be huge with many files, it is almost impossible to open each files to check whether all of them are type safe. We need a smarter and quicker way.

Under `scripts` property in your `package.json` file, create commands like this:

```json
{
  "scripts": {
    "check": "tsc --project jsconfig.json",
    "check:watch": "tsc --watch --project jsconfig.json"
  }
}
```

Now, you can run `check` command for one time checking and run `check:watch` command for keep rechecking when any file under source path changed.

```javascript
$ npm run check

$ npm run check:watch
```

## Summary

You can get the advantage of both statically type checking and compile time checking by leveraging JSDoc, TypeScript, and VSCode, even you are developing a JavaScript project, you don't need to compromise.

Don't forget to read VSCode docs [Working with JavaScript](https://code.visualstudio.com/docs/nodejs/working-with-javascript) which still contain many information I haven't cover in this article.

If you have any question please comment below or go to repository mentioned above and file an issue.
