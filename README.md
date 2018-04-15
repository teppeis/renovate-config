@teppeis/renovate-config
====

My [shareable config](https://renovateapp.com/docs/configuration-reference/config-presets) for [Renovate](https://renovateapp.com)

[![npm version][npm-image]][npm-url]
[![build status][circleci-image]][circleci-url]
[![dependency status][deps-image]][deps-url]
![License][license]

## Setup

Enable Renovate in your repo and just `extends` in `renovate.json`.

```js
{
  "extends": ["@teppeis"] // or ["@teppeis:anytime"]
}
```

Note: You don't have to do `npm i -D @teppeis/renovate-config`.
Renovate fetches it from npm registry automatically.

## Presets

### `@teppeis` (default)

- Run Renovate on following schedule: before 8am in Asia/Tokyo
- Run lock file maintenance (updates) on Saturday
- Separate major, minor and patch releases of dependencies into individual branches/PRs
- Automerge patch upgrades if they pass tests
- Disable major upgrade of `@types/node`
- Upgrade semver ranges to latest version even if latest version satisfies existing range.
- Wait until branch tests have passed or failed before creating the PR
- Set a status check to warn when upgrades <  24 hours old might get unpublished
- Make no updates to branches when not scheduled
- Limit to maximum 10 concurrent Renovate PRs at any time
- Apply label `renovate` to PRs
- Use `build` as semantic commit type for commit messages and PR titles
- Ignore `node_modules`, `bower_components`, and various test/tests directories
- Group monorepo packages together
- Group ESLint, the plugins, the config and Prettier together
- Pin and update Docker digest in CircleCI yaml with automerge on Saturday morning

```json
{
  "extends": [
    ":timezone(Asia/Tokyo)",
    ":maintainLockFilesWeekly",
    ":separatePatchReleases",
    ":automergePatch",
    "helpers:disableTypesNodeMajor",
    ":preserveSemverRanges",
    ":prNotPending",
    ":unpublishSafe",
    ":noUnscheduledUpdates",
    ":prConcurrentLimit10",
    ":label(renovate)",
    ":semanticCommitType(build)",
    ":ignoreModulesAndTests",
    "group:monorepos"
  ],
  "upgradeInRange": true,
  "schedule": ["before 8am"],
  "lockFileMaintenance": {
    "schedule": ["on Saturday"]
  },
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
  ],
  "circleci": {
    "semanticCommitType": "ci",
    "semanticCommitScope": "docker",
    "auromerge": true,
    "automergeType": "branch-push",
    "schedule": [
      "before 8am on saturday"
    ]
  }
}
```

### `@teppeis:anytime`

- Run Renovate ***at any time***

```json
{
  "extends": [
    "@teppeis"
  ],
  "schedule": [],
  "lockFileMaintenance": {
    "schedule": []
  },
  "circleci": {
    "schedule": []
  }
}
```

## References

- [Full Config Presets \- Renovate](https://renovateapp.com/docs/config-presets/config-config)
- [Default Presets \- Renovate](https://renovateapp.com/docs/config-presets/config-default)
- [Configuration Options \- Renovate](https://renovateapp.com/docs/configuration-reference/configuration-options)
- [Shareable Config Presets \- Renovate](https://renovateapp.com/docs/configuration-reference/config-presets)
- [Other shareable configs in GitHub](https://github.com/search?o=desc&q=%22renovate-config%22&s=stars&type=Repositories&utf8=%E2%9C%93)

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
