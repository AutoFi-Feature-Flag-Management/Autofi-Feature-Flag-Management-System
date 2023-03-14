const FeatureFlag = require("../../shared/model/featureFlag");
const expect = require("chai").expect;

describe("Feature Flag Object", () => {
  describe("Feature Flag Constructor", () => {
    it("should create a feature flag object with the correct properties", () => {
      const date = new Date();
      const feature_flag = new FeatureFlag(
        "test_key",
        "test_name",
        true,
        date,
        "test_description"
      );
      expect(feature_flag.key).to.equal("test_key");
      expect(feature_flag.name).to.equal("test_name");
      expect(feature_flag.value).to.equal(true);
      expect(feature_flag.lastUpdatedDate).to.equal(date);
      expect(feature_flag.description).to.equal("test_description");
    });
  });
});
