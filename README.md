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

## Config

```json
{
  "extends": [
    "config:base",
    ":noUnscheduledUpdates",
    ":separatePatchReleases",
    ":automergePatch",
    ":maintainLockFilesMonthly",
    ":prConcurrentLimit10",
    ":prNotPending",
    ":preserveSemverRanges",
    ":unpublishSafe"
  ],
  "upgradeInRange": true,
  "schedule": ["before 6am"],
  "timezone": "Asia/Tokyo"
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
