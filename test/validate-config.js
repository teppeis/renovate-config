'use strict';

const assert = require('assert');

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
  }
});
