# Contributing

1. Clone the repo
1. `npm install`
1. `npm run build` to build source code
1. `npm run test` to run tests

### Developing Rules

Rules generally comprise two parts: a `Rule` class and a `RuleWalker` class. Rules which operate on TypeScript code can use extend `RuleWalker` directly from `tslint`, but rules which operate on markup or styles must use the `NgWalker` from [codelyzer](https://github.com/mgechev/codelyzer).

#### Resources

* [Developing TSLint rules](https://palantir.github.io/tslint/develop/custom-rules/)

### Linking the Rules into a Project

Do not use `npm link`!

1. `npm run tsc:watch` to watch for source changes
1. Copy the rules into your project's `node_modules`:

    ```
    rsync --exclude node_modules --exclude .git -rv /path/to/v4-migration-tslint node_modules/@ionic
    ```

1. Follow usage instructions in [`README.md`](https://github.com/ionic-team/v4-migration-tslint/blob/develop/README.md#how-to-use)
