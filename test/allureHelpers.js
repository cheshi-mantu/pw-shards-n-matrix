//   TESTS_SUCCESS=always  -> every test passes
//   TESTS_SUCCESS=never   -> every test fails (assertion -> Allure "failed")
//   TESTS_SUCCESS=broken  -> every test is broken (thrown Error -> Allure "broken")
//   TESTS_SUCCESS=random  -> ~10% of assertions fail (default when unset)

const os = require("os");
const { expect, test } = require("@playwright/test");
const allure = require("allure-js-commons");

// Mirrors the 0.1 probability used in the per-suite conftest._should_fail().
const FAIL_PROBABILITY = 0.1;

function shouldFail() {
  const mode = process.env.TESTS_SUCCESS || "random";
  if (mode === "always") return false;
  if (mode === "never") return true;
  return Math.random() < FAIL_PROBABILITY;
}

function osLabel() {
  const map = { darwin: "macos", win32: "windows", linux: "linux" };
  return process.env.TESTS_OS || map[os.platform()] || os.platform();
}

async function applyGate() {
  await allure.label("os", osLabel());
  if ((process.env.TESTS_SUCCESS || "random") === "broken") {
    test.setTimeout(1);
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

async function assertStep(name, reason = "ODD") {
  await allure.step(name, async () => {
    expect(shouldFail(), `Failure due to reason ${reason}`).toBe(false);
  });
}

async function setup({ layer, owner } = {}) {
  await applyGate(); 
  if (layer) await allure.layer(layer);
  if (layer === "unit") await allure.epic("BE unit tests");
  if (layer === "api") await allure.epic("BE tests");
  if (layer === "e2e") await allure.epic("FE tests");
  if (layer === "web") await allure.epic("FE tests");
  if (owner) await allure.owner(owner);
}

const pad = (n, width = 3) => String(n).padStart(width, "0");

module.exports = {
  FAIL_PROBABILITY,
  shouldFail,
  osLabel,
  applyGate,
  setup,
  assertStep,
  pad,
};
