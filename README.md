# @teppeis/renovate-config

My [shareable config](https://renovatebot.com/docs/config-presets/) for [Renovate](https://renovatebot.com)

[![npm version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![dependency status][deps-image]][deps-url]
![License][license]

## Setup

Enable Renovate in your repo and just `extends` in `renovate.json`.

```js
{
  "extends": ["github>teppeis/renovate-config"] // or ["github>teppeis/renovate-config:anytime"]
}
```

Note: You don't have to do `npm i -D @teppeis/renovate-config`.
Renovate fetches it from this GitHub repo automatically.

## Presets

### `github>teppeis/renovate-config` (`default`)

#### General

- Ignore `node_modules`, `bower_components`, and various test/tests directories
- Apply label `renovate` to PRs
- Limit to maximum 10 concurrent Renovate PRs at any time
- Wait until branch tests have passed or failed before creating the PR
- If semantic commits detected, use semantic commit type `fix` for deps and peerDeps, `chore` for all others
- Use Asia/Tokyo timezone
- Group [preset monorepo packages](https://renovatebot.com/docs/presets-monorepo/) together

#### for npm

- Automerge patch upgrades if they pass tests
- Make no updates to branches when not scheduled
- Separate major, minor and patch releases of dependencies into individual branches/PRs
- Wait until the npm package is three days old before raising the update for stability
- Run `npm dedupe` after package-lock.json updates
- Disable major upgrade of `@types/node`
- Run following schedule: after 9pm and before 9am
- Upgrade semver ranges to latest version even if latest version satisfies existing range.
- Automerge minor updates in devDeps

#### for lock file maintenance

- Run following schedule: before 3am on the first day of the month

#### for Docker digests in CirleCI config.yml

- Pin docker images with sha256 digest
- Automerge with push the new commit directly to base branch (w/o PR)
- Use `ci(docker):` as semantic commit type
- Run following schedule: before 9am on Friday
- Group all versions of Node.js images (`node` and `circleci/node`)

#### for `engines` field in `package.json`

- disabled

```json
{
  "extends": [
    ":ignoreModulesAndTests",
    ":label(renovate)",
    ":prConcurrentLimit10",
    ":prNotPending",
    ":timezone(Asia/Tokyo)",
    "group:monorepos"
  ],
  "npm": {
    "extends": [
      ":automergePatch",
      ":noUnscheduledUpdates",
      ":separatePatchReleases",
      "npm:unpublishSafe",
      "helpers:disableTypesNodeMajor",
      "local>teppeis/renovate-config:semanticPrefixFixDepsPeerChoreOthers"
    ],
    "schedule": ["after 9pm", "before 9am"],
    "rangeStrategy": "bump",
    "postUpdateOptions": ["npmDedupe"],
    "lockFileMaintenance": {
      "enabled": true,
      "schedule": ["before 3am on the first day of the month"]
    },
    "packageRules": [
      {
        "description": ["automerge minor updates in devDeps"],
        "automerge": true,
        "matchUpdateTypes": ["minor"],
        "matchDepTypes": ["devDependencies"]
      },
      {
        "description": ["disable package.json > engines update"],
        "matchDepTypes": ["engines"],
        "enabled": false
      },
      {
        "schedule": "at any time",
        "minimumReleaseAge": "0",
        "matchPackageNames": ["eslint-config-teppeis"]
      }
    ]
  },
  "circleci": {
    "enabled": true,
    "automerge": true,
    "automergeType": "branch",
    "schedule": ["before 9am on Friday"],
    "semanticCommitScope": "docker",
    "semanticCommitType": "ci",
    "pinDigests": true,
    "packageRules": [
      {
        "groupName": "Node Docker digests in CircleCI",
        "matchPackageNames": ["circleci/node", "node"]
      }
    ]
  }
}
```

### `github>teppeis/renovate-config:anytime`

- Run Renovate **_at any time_**

```json
{
  "extends": ["local>teppeis/renovate-config"],
  "npm": {
    "schedule": "at any time"
  },
  "lockFileMaintenance": {
    "schedule": "at any time"
  },
  "circleci": {
    "schedule": "at any time"
  }
}
```

### `github>teppeis/renovate-config:semanticPrefixFixDepsPeerChoreOthers`

If semantic commits detected, use semantic commit type `fix` for `dependencies` and `peerDependencies`, `chore` for all others

```json
"semanticPrefixFixDepsPeerChoreOthers": {
  "packageRules": [
    {
      "matchPackagePatterns": [
        "*"
      ],
      "semanticCommitType": "chore"
    },
    {
      "matchDepTypes": [
        "dependencies",
        "peerDependencies"
      ],
      "semanticCommitType": "fix"
    }
  ]
}
```

## References

- [Renovate Docs](https://renovatebot.com/docs/)
- [Configuration Options \| Renovate Docs](https://renovatebot.com/docs/configuration-options/)
- [Default Presets \| Renovate Docs](https://renovatebot.com/docs/presets-default/)
- [Other shareable configs in GitHub](https://github.com/search?o=desc&q=%22renovate-config%22&s=stars&type=Repositories&utf8=%E2%9C%93)
- [RunKit \+ npm: later](https://npm.runkit.com/later): [later](https://www.npmjs.com/package/later) is a parser that used to parse `schedule` in renovate

## License

MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;

[npm-image]: https://img.shields.io/npm/v/@teppeis/renovate-config.svg
[npm-url]: https://npmjs.org/package/@teppeis/renovate-config
[npm-downloads-image]: https://img.shields.io/npm/dm/@teppeis/renovate-config.svg
[ci-image]: https://github.com/teppeis/renovate-config/workflows/ci/badge.svg
[ci-url]: https://github.com/teppeis/renovate-config/actions?query=workflow%3Aci
[deps-image]: https://img.shields.io/david/teppeis/renovate-config.svg
[deps-url]: https://david-dm.org/teppeis/renovate-config
[node-version]: https://img.shields.io/badge/Node.js%20support-v6,v8,v9-brightgreen.svg
[coverage-image]: https://img.shields.io/coveralls/teppeis/renovate-config/master.svg
[coverage-url]: https://coveralls.io/github/teppeis/renovate-config?branch=master
[license]: https://img.shields.io/npm/l/@teppeis/renovate-config.svg
