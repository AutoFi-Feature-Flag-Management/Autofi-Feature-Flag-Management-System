const {
  launchDarklyFlagMarshaller,
} = require("../businessLayer/marshals/launchDarklyFeatureFlagMarshal");
const FeatureFlag = require("../../../shared/model/featureFlag");

/**
 * Tests the launchDarklyFlagMarshaller function.
 */
describe("launchDarklyFlagMarshaller", () => {
  /**
   * A sample single feature flag.
   *
   * @type {JSON}
   */
  const singleFlag = {
    key: "my-flag",
    name: "My Feature Flag",
    environments: {
      production: {
        on: true,
        lastModified: "2022-01-01T00:00:00Z",
      },
    },
    description: "This is a description of my feature flag",
  };

  /**
   * A sample multiple feature flags.
   *
   * @type {JSON}
   */
  const multipleFlags = {
    items: [
      {
        key: "flag-1",
        name: "Flag 1",
        environments: {
          production: {
            on: true,
            lastModified: "2022-01-01T00:00:00Z",
          },
        },
        description: "This is a description of flag 1",
      },
      {
        key: "flag-2",
        name: "Flag 2",
        environments: {
          production: {
            on: false,
            lastModified: "2022-01-02T00:00:00Z",
          },
        },
        description: "This is a description of flag 2",
      },
    ],
  };

  /**
   * Tests the launchDarklyFlagMarshaller function with a single flag.
   */
  test("should marshal a single feature flag", () => {
    const marshalled = launchDarklyFlagMarshaller(singleFlag);
    expect(marshalled).toEqual([
      new FeatureFlag(
        "my-flag",
        "My Feature Flag",
        true,
        new Date("2022-01-01T00:00:00Z"),
        "This is a description of my feature flag"
      ),
    ]);
  });

  /**
   * Tests the launchDarklyFlagMarshaller function with multiple flags.
   */
  test("should marshal multiple feature flags", () => {
    const marshalled = launchDarklyFlagMarshaller(multipleFlags);
    expect(marshalled).toEqual([
      new FeatureFlag(
        "flag-1",
        "Flag 1",
        true,
        new Date("2022-01-01T00:00:00Z"),
        "This is a description of flag 1"
      ),
      new FeatureFlag(
        "flag-2",
        "Flag 2",
        false,
        new Date("2022-01-02T00:00:00Z"),
        "This is a description of flag 2"
      ),
    ]);
  });
});
