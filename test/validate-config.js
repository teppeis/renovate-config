'use strict';

const assert = require('assert');
const {initLogger} = require('renovate/lib/logger');
const cache = require('renovate/lib/workers/global/cache');
const {migrateAndValidate} = require('renovate/lib/config/migrate-validate');
const tempy = require('tempy');

initLogger();
cache.init(tempy.directory());

describe('@teppeis/renovate-config', () => {
  let pkg, renovateConfig;
  beforeEach(() => {
    pkg = require('../package.json');
    renovateConfig = pkg['renovate-config'];
  });
  afterEach(() => {
    pkg = null;
    renovateConfig = null;
  });

  it('package.json has "renovate-config"', () => {
    assert(renovateConfig);
  });

  assertConfig('default');
  assertConfig('anytime');

  function assertConfig(name) {
    it(`"renovate-config" has "${name}"`, async () => {
      assert(renovateConfig[name]);
    });

    it(`"${name}" is valid`, async () => {
      const config = renovateConfig[name];
      const {errors, warnings} = await migrateAndValidate({}, config);
      assert.deepEqual(errors, []);
      assert.deepEqual(warnings, []);
    });
  }
});

describe('renovate.json', () => {
  it('valid', async () => {
    const config = require('../renovate.json');
    const {errors, warnings} = await migrateAndValidate({}, config);
    assert.deepEqual(errors, []);
    assert.deepEqual(warnings, []);
  });
});
