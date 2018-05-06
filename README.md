@teppeis/renovate-config
====

My [shareable config](https://renovatebot.com/docs/config-presets/) for [Renovate](https://renovatebot.com)

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

#### General

- Ignore `node_modules`, `bower_components`, and various test/tests directories
- Apply label `renovate` to PRs
- Limit to maximum 10 concurrent Renovate PRs at any time
- Wait until branch tests have passed or failed before creating the PR
- Use `build(deps):` for devDeps and `fix(deps):` for deps as semantic commit type
- Use Asia/Tokyo timezone
- Group monorepo packages together

#### for npm

- Automerge patch upgrades if they pass tests
- Make no updates to branches when not scheduled
- Separate major, minor and patch releases of dependencies into individual branches/PRs
- Set a status check to warn when upgrades <  24 hours old might get unpublished
- Disable major upgrade of `@types/node`
- Run following schedule: after 9pm and before 9am
- Upgrade semver ranges to latest version even if latest version satisfies existing range.
- Group ESLint, the plugins, the config and Prettier together

#### for lock file maintenance

- Run following schedule: every weekend and before before 9am on Monday

#### for Docker digests in CirleCI config.yml

- Run following schedule: on Friday
- Automerge with push the new commit directly to base branch (no PR)
- Use `ci(docker):` as semantic commit type
- Group all versions of Node.js images

```json
{
  "extends": [
    ":ignoreModulesAndTests",
    ":label(renovate)",
    ":prConcurrentLimit10",
    ":prNotPending",
    ":semanticCommitType(build)",
    ":timezone(Asia/Tokyo)",
    "group:monorepos"
  ],
  "npm": {
    "extends": [
      ":automergePatch",
      ":noUnscheduledUpdates",
      ":separatePatchReleases",
      ":unpublishSafe",
      "helpers:disableTypesNodeMajor"
    ],
    "schedule": [
      "after 9pm",
      "before 9am"
    ],
    "upgradeInRange": true,
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
  },
  "lockFileMaintenance": {
    "enabled": true,
    "schedule": [
      "every weekend",
      "before 9am on Monday"
    ]
  },
  "circleci": {
    "enabled": true,
    "automerge": true,
    "automergeType": "branch-push",
    "schedule": [
      "on Friday"
    ],
    "semanticCommitScope": "docker",
    "semanticCommitType": "ci",
    "packageRules": [
      {
        "groupName": "Node Docker digests in CircleCI",
        "packageNames": [
          "node"
        ]
      }
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
  "npm": {
    "schedule": []
  },
  "lockFileMaintenance": {
    "schedule": []
  },
  "circleci": {
    "schedule": []
  }
}
```

## References

- [Renovate Docs](https://renovatebot.com/docs/)
- [Configuration Options \| Renovate Docs](https://renovatebot.com/docs/configuration-options/)
- [Default Presets \| Renovate Docs](https://renovatebot.com/docs/presets-default/)
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
