module.exports = class FeatureFlag {
  constructor(key, name, value, lastUpdatedDate) {
    this.key = key;
    this.name = name;
    this.value = value;
    this.lastUpdatedDate = lastUpdatedDate;
  }
};
