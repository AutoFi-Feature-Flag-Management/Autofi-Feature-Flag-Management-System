/**
 * Class for representing a feature flag.
 *
 * @class FeatureFlag
 * @property {string} key - Key of the feature flag
 * @property {string} name - Name of the feature flag
 * @property {any} value - Value of the feature flag
 * @property {Date} lastUpdatedDate - Date when the feature flag was last updated
 */
module.exports = class FeatureFlag {
  /**
   * Constructor for creating a new instance of FeatureFlag.
   *
   * @constructor
   * @param {string} key - Key of the feature flag
   * @param {string} name - Name of the feature flag
   * @param {any} value - Value of the feature flag
   * @param {Date} lastUpdatedDate - Date when the feature flag was last updated
   */
  constructor(key, name, value, lastUpdatedDate) {
    this.key = key;
    this.name = name;
    this.value = value;
    this.lastUpdatedDate = lastUpdatedDate;
  }
};
