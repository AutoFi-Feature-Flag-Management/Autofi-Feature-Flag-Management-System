const business = require("../businessLayer/business");
const launchDarklyFeatureFlagMarshal = require("../businessLayer/marshals/launchDarklyFeatureFlagMarshal");
const launchDarklyController = require("../featureFlagController/launchDarklyController");

// Mock the dependencies
jest.mock("../featureFlagController/launchDarklyController");
jest.mock("../businessLayer/marshals/launchDarklyFeatureFlagMarshal");

/**
 * Test suite for the business.getFeatureFlags method
 */
describe("getFeatureFlags", () => {
  /**
   * Test case to verify that launchDarklyController.getFeatureFlags is called with the correct params
   */
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
  /**
   * Test case to verify that launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller is called with the correct params
   */
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

/**
 * Test suite for the business.getFeatureFlag method
 */
describe("getFeatureFlag", () => {
  /**
   * Test case to verify that launchDarklyController.getFeatureFlag is called with the correct params
   */
  it("should call launchDarklyController.getFeatureFlag with the correct params", async () => {
    const parameters = { key: "test" };
    await business.getFeatureFlag(parameters);
    expect(launchDarklyController.getFeatureFlag).toHaveBeenCalledWith(
      parameters
    );
  });
  /**
   * Test case to verify that launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller is called with the correct params
   */
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
/**
 * Test suite for the business.changeFlag method
 */
describe("changeFlag", () => {
  /**
   * Test case to verify that launchDarklyController.changeFlag is called with the correct params
   */
  it("should call launchDarklyController.changeFlag with the correct params", async () => {
    const parameters = { key: "test", value: true };
    await business.changeFlag(parameters);
    expect(launchDarklyController.changeFlag).toHaveBeenCalledWith(parameters);
  });
  /**
   * Test case to verify that an error is thrown in launchDarklyController.changeFlag for not being a boolean
   */
  it("should throw error in launchDarklyController.changeFlag for not being a boolean", async () => {
    const parameters = { key: "test", value: "hello" };
    await expect(business.changeFlag(parameters)).rejects.toThrow(
      "value must be a boolean"
    );
  });
});
/**
 * Test suite for the business.getNumberOfFlags method
 */
describe("getNumberOfFlags", () => {
  /**
   * Test case to verify that launchDarklyController.getNumberOfFlags is called once and returns correct number of flags
   */
  it("should call launchDarklyController.getNumberOfFlags once", async () => {
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
      [
        {
          key: "test1",
          name: "Test1",
          value: false,
          lastUpdatedDate: "2023-03-23T20:25:34.947Z",
          description: "This is a test",
        },
        {
          key: "test1",
          name: "Test1",
          value: false,
          lastUpdatedDate: "2023-03-23T20:25:34.947Z",
          description: "This is a test",
        },
      ]
    );
    const numberOfFlags = await business.getNumberOfFlags();
    expect(numberOfFlags).toBe("2");
  });
});
