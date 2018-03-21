'use strict';

const assert = require('assert');
const {validateConfig} = require('renovate/lib/config/validation');

const pkg = require('../package.json');
const config = pkg['renovate-config'];
assert(config, 'package.json > renovate-config is not found');

assertConfig(config, 'default');
assertConfig(config, 'anytime');

function assertConfig(renovateConfig, name) {
  const config = renovateConfig[name];
  assert(config, `package.json > renovate-config > ${name} is not found`);
  const {errors, warnings} = validateConfig(config);
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
}
