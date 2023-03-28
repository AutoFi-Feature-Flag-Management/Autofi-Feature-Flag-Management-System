/**
 * @fileOverview Unit tests for the FeatureFlag class.
 */

const FeatureFlag = require("../../../shared/model/featureFlag.js");

/**
 * Tests for the FeatureFlag class.
 */
describe("featureFlag", () => {
  /**
   * Test the constructor method.
   */
  describe("constructor", () => {
    /**
     * Test that a new instance of FeatureFlag can be created.
     */
    it("should create a new instance of FeatureFlag", () => {
      const flag = new FeatureFlag(
        "key1",
        "Name 1",
        true,
        new Date(),
        "Description 1"
      );
      expect(flag instanceof FeatureFlag).toBe(true);
    });
    /**
     * Test that the key, name, value, lastUpdatedDate, and description properties are set correctly.
     */
    it("should set the key, name, value, lastUpdatedDate, and description properties correctly", () => {
      const key = "key1";
      const name = "Name 1";
      const value = true;
      const lastUpdatedDate = new Date();
      const description = "Description 1";
      const flag = new FeatureFlag(
        key,
        name,
        value,
        lastUpdatedDate,
        description
      );
      expect(flag.key).toBe(key);
      expect(flag.name).toBe(name);
      expect(flag.value).toBe(value);
      expect(flag.lastUpdatedDate).toBe(lastUpdatedDate);
      expect(flag.description).toBe(description);
    });
  });
});
