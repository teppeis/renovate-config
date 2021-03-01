"use strict";

const assert = require("assert");

describe("@teppeis/renovate-config", () => {
  let renovateConfig;
  beforeEach(() => {
    renovateConfig = require("../default.json");
  });
  afterEach(() => {
    renovateConfig = null;
  });

  it('package.json has "renovate-config"', () => {
    assert(renovateConfig);
  });

  assertConfig("default");
  assertConfig("anytime");

  function assertConfig(name) {
    it(`"renovate-config" has "${name}"`, async () => {
      assert(renovateConfig[name]);
    });
  }
});
