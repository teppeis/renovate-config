'use strict';

const assert = require('assert');
const {validateConfig} = require('renovate/lib/config/validation');

const pkg = require('../package.json');
const config = pkg['renovate-config'];
assert(config, 'package.json > renovate-config is not found');
const defaultPreset = config.default;
assert(defaultPreset, 'package.json > renovate-config > default is not found');
const {errors, warnings} = validateConfig(defaultPreset);
assert.deepEqual(errors, []);
assert.deepEqual(warnings, []);
