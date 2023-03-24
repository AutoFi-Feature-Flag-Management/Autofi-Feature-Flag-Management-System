const business = require("../businessLayer/business");
const launchDarklyFeatureFlagMarshal = require("../businessLayer/marshals/launchDarklyFeatureFlagMarshal");
const launchDarklyController = require("../featureFlagController/launchDarklyController");

jest.mock("../featureFlagController/launchDarklyController");
jest.mock("../businessLayer/marshals/launchDarklyFeatureFlagMarshal");

describe("getFeatureFlags", () => {
  it("should call launchDarklyController.getFeatureFlags with the correct params", async () => {
    const parameters = { project: "test" };
    launchDarklyController.getFeatureFlags.mockResolvedValueOnce([
      {
        key: "test1",
        name: "Test1",
        value: false,
        lastUpdatedDate: "2023-03-23T20:25:34.947Z",
        description: "This is a test",
      },
    ]);
    launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller.mockResolvedValueOnce(
      {
        test: "test",
      }
    );
    await business.getFeatureFlags(parameters);
    expect(launchDarklyController.getFeatureFlags).toHaveBeenCalledWith(
      parameters
    );
  });

  it("should call launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller with the correct params", async () => {
    const parameters = { data: "test" };
    launchDarklyController.getFeatureFlags.mockResolvedValueOnce({
      test: "test",
    });
    const data = await business.getFeatureFlags(parameters);
    expect(
      launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller
    ).toHaveBeenCalledWith({
      test: "test",
    });
  });
});

describe("getFeatureFlag", () => {
  it("should call launchDarklyController.getFeatureFlag with the correct params", async () => {
    const parameters = { key: "test" };
    await business.getFeatureFlag(parameters);
    expect(launchDarklyController.getFeatureFlag).toHaveBeenCalledWith(
      parameters
    );
  });

  it("should call launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller with the correct params", async () => {
    const parameters = { data: "test" };
    launchDarklyController.getFeatureFlags.mockResolvedValueOnce({
      test: "test",
    });
    const data = await business.getFeatureFlag(parameters);
    expect(
      launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller
    ).toHaveBeenCalledWith({
      test: "test",
    });
  });
});

describe("changeFlag", () => {
  it("should call launchDarklyController.changeFlag with the correct params", async () => {
    const parameters = { key: "test", value: true };
    await business.changeFlag(parameters);
    expect(launchDarklyController.changeFlag).toHaveBeenCalledWith(parameters);
  });
});
