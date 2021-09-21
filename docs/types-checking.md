## How to enable type checking

Even you already typed your data and function, still VSCode can't give you any warning or error message if you make any mistake.

There are two options to enable type checking in VSCode, by file or by project folder, both needs manually enabled.

### Checking by file

To enable type checking for specify file, add comment `// @ts-check` at the first line of file.

```javascript
// @ts-check

// @ts-expect-error
/** @type {string} */
const name = 123;
```

Enabling type checking by file is very helpful for progressively enhance your project's type safety.

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
