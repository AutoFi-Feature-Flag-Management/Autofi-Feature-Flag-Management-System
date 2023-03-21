const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const fetch = require("node-fetch");

const getFeatureFlags = require("../app/featureFlagController/launchDarklyController");

describe("getFeatureFlags", function () {
  let fetchStub;

  beforeEach(function () {
    // Create a stub for fetch to mock the API call
    fetchStub = sinon.stub(fetch, "Promise");
  });

  afterEach(function () {
    // Restore fetch to its original implementation after each test
    fetchStub.restore();
  });

  it("should return feature flags when called with valid project key", async function () {
    // Define the expected response
    const expectedResponse = { message: "Feature flags" };

    // Configure the fetch stub to return the expected response
    fetchStub.resolves({
      status: 200,
      text: () => Promise.resolve(JSON.stringify(expectedResponse)),
    });

    // Call getFeatureFlags with a valid project key
    const result = await getFeatureFlags();

    // Verify that the fetch stub was called with the expected arguments
    expect(fetchStub).to.have.been.calledWith(
      "https://app.launchdarkly.com/api/v2/default",
      {
        method: "GET",
        headers: {
          Authorization: "api-b85a475e-50aa-4866-b376-a89bbefa98bb",
        },
      }
    );

    // Verify that the function returns the expected result
    expect(result).to.equal(JSON.stringify(expectedResponse));
  });

  it("should throw an error when called with an invalid project key", async function () {
    // Configure the fetch stub to return an error response
    fetchStub.resolves({
      status: 404,
      text: () => Promise.resolve("Project key not found"),
    });

    // Call getFeatureFlags with an invalid project key
    try {
      await getFeatureFlags("invalid_project_key");
      // If the function does not throw an error, the test should fail
      expect.fail("Function did not throw expected error");
    } catch (error) {
      // Verify that the error message is as expected
      expect(error.message).to.equal("Project key not found");
    }
  });
});
