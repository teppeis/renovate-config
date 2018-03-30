'use strict';

const assert = require('assert');
const {initLogger} = require('renovate/lib/logger');
const {validateConfig} = require('renovate/lib/config/validation');

initLogger();

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
      const {errors, warnings} = await validateConfig(config);
      assert.deepEqual(errors, []);
      assert.deepEqual(warnings, []);
    });
  }
});
