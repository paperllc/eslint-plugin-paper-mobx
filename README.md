# eslint-plugin-paper-mobx

## Install

In package.json add to devDependencies:

```json
{
  "devDependencies": {
    "eslint-plugin-paper-mobx": "github:paperllc/eslint-plugin-paper-mobx#semver:^1.0.0"
  }
}
```

## Usage

Add to eslint config:

```json
{
  "extends": [
    "plugin:paper-mobx/recommended"
  ],
  "plugins": [
    "paper-mobx"
  ]
}
```

## Rules

The package adds only one rule: `paper-mobx/no-mobx-async-actions`.

### `paper-mobx/no-async-action`

This rule disallows using `@actions` decorator in async methods.
