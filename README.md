@teppeis/renovate-config
====

My [shareable config](https://renovateapp.com/docs/configuration-reference/config-presets) for [Renovate](https://renovateapp.com)

[![npm version][npm-image]][npm-url]
[![build status][circleci-image]][circleci-url]
[![dependency status][deps-image]][deps-url]
![License][license]

## Setup

Install

```console
$ npm install -D @teppeis/renovate-config
```

and add following `renovate.json` to your repo.

```json
{
  "extends": ["@teppeis"]
}
```

## Presets

### `@teppeis` (default)

- Run Renovate on following schedule: before 6am in Asia/Tokyo
- Run lock file maintenance (updates) on the first day of each month
- Separate major, minor and patch releases of dependencies into individual branches/PRs
- Automerge patch upgrades if they pass tests
- Upgrade semver ranges to latest version even if latest version satisfies existing range.
- Upgrade to unstable versions only if the existing version is unstable
- Wait until branch tests have passed or failed before creating the PR
- Set a status check to warn when upgrades <  24 hours old might get unpublished
- Make no updates to branches when not scheduled
- Limit to maximum 20 concurrent Renovate PRs at any time
- Group monorepo packages together
- Group ESLint, the plugins, the config and Prettier together
- Disable major upgrade of `@types/node`
- Use `renovate/` as prefix for all branch names
- If semantic commits detected, use semantic commit type `fix` for dependencies and `chore` for all others
- Ignore `node_modules`, `bower_components`, and various test/tests directories

```json
{
  "extends": [
    "config:base",
    ":noUnscheduledUpdates",
    ":separatePatchReleases",
    ":automergePatch",
    ":maintainLockFilesMonthly",
    ":prNotPending",
    ":preserveSemverRanges",
    ":unpublishSafe"
  ],
  "upgradeInRange": true,
  "prHourlyLimit": 0,
  "schedule": ["before 6am"],
  "timezone": "Asia/Tokyo",
  "packageRules": [
    {
      "groupName": "ESLint and Prettier",
      "packageNames": [
        "eslint",
        "eslint-config-prettier",
        "eslint-config-teppeis",
        "eslint-plugin-eslint-comments",
        "eslint-plugin-node",
        "eslint-plugin-prettier",
        "prettier"
      ]
    }
  ]
}
```

### `@teppeis:anytime`

- Run Renovate ***at any time***

```json
{
  "extends": [
    "@teppeis"
  ],
  "schedule": []
}
```

## References

- [Full Config Presets \- Renovate](https://renovateapp.com/docs/config-presets/config-config)
- [Default Presets \- Renovate](https://renovateapp.com/docs/config-presets/config-default)
- [Configuration Options \- Renovate](https://renovateapp.com/docs/configuration-reference/configuration-options)
- [Shareable Config Presets \- Renovate](https://renovateapp.com/docs/configuration-reference/config-presets)

## License

MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;

[npm-image]: https://img.shields.io/npm/v/@teppeis/renovate-config.svg
[npm-url]: https://npmjs.org/package/@teppeis/renovate-config
[npm-downloads-image]: https://img.shields.io/npm/dm/@teppeis/renovate-config.svg
[travis-image]: https://img.shields.io/travis/teppeis/renovate-config/master.svg
[travis-url]: https://travis-ci.org/teppeis/renovate-config
[circleci-image]: https://circleci.com/gh/teppeis/renovate-config.svg?style=shield
[circleci-url]: https://circleci.com/gh/teppeis/renovate-config
[deps-image]: https://img.shields.io/david/teppeis/renovate-config.svg
[deps-url]: https://david-dm.org/teppeis/renovate-config
[node-version]: https://img.shields.io/badge/Node.js%20support-v6,v8,v9-brightgreen.svg
[coverage-image]: https://img.shields.io/coveralls/teppeis/renovate-config/master.svg
[coverage-url]: https://coveralls.io/github/teppeis/renovate-config?branch=master
[license]: https://img.shields.io/npm/l/@teppeis/renovate-config.svg
