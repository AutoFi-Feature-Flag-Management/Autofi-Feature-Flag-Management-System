const clientController = require("../app/clientController/clientController");
const business = require("../app/businessLayer/business");

jest.mock("../app/businessLayer/business");

/**
 * Tests the "getFeatureFlags" function of the "clientController".
 */
describe("getFeatureFlags", () => {
  /**
   * It tests whether the "business.getFeatureFlags" function is called with the correct parameters.
   */
  it("should call business.getFeatureFlags with the correct params", async () => {
    const req = { query: { project: "test" } };
    const res = { send: jest.fn() };
    const next = jest.fn();
    business.getFeatureFlags.mockResolvedValueOnce({ test: "test" });
    await clientController.getFeatureFlags(req, res, next);
    expect(business.getFeatureFlags).toHaveBeenCalledWith(req.query);
  });
});

/**
 * Tests the "getFeatureFlags" function of the "clientController".
 */
describe("getFeatureFlags", () => {
  /**
   * It tests sending error messages
   */
  it("should call business.getFeatureFlags with the correct params", async () => {
    const req = { query: { project: "test" } };
    const res = { send: jest.fn(), status: jest.fn() };
    const next = jest.fn();
    business.getFeatureFlags.mockRejectedValue(new Error("test"));
    await clientController.getFeatureFlags(req, res, next);
    expect(res.send).toHaveBeenCalledWith("test");
  });
});

/**
 * Tests the "getFeatureFlag" function of the "clientController".
 */
describe("getFeatureFlag", () => {
  /**
   * It tests whether the "business.getFeatureFlag" function is called with the correct parameters.
   */
  it("should call business.getFeatureFlag with the correct params", async () => {
    const req = { params: { key: "test" } };
    const res = { send: jest.fn() };
    const next = jest.fn();
    business.getFeatureFlag.mockResolvedValueOnce({ test: "test" });
    await clientController.getFeatureFlag(req, res, next);
    expect(business.getFeatureFlag).toHaveBeenCalledWith(req.params);
  });
});

/**
 * Tests the "getFeatureFlag" function of the "clientController".
 */
describe("getFeatureFlag", () => {
  /**
   * It tests sending error messages
   */
  it("should call business.getFeatureFlag with the correct params", async () => {
    const req = { query: { project: "test" } };
    const res = { send: jest.fn(), status: jest.fn() };
    const next = jest.fn();
    business.getFeatureFlag.mockRejectedValue(new Error("test"));
    await clientController.getFeatureFlag(req, res, next);
    expect(res.send).toHaveBeenCalledWith("test");
  });
});

/**
 * Tests the "changeFlag" function of the "clientController".
 */
describe("changeFlag", () => {
  /**
   * It tests whether the "business.changeFlag" function is called with the correct parameters.
   */
  it("should call business.changeFlag with the correct body", async () => {
    const req = { body: { key: "test" } };
    const res = { send: jest.fn() };
    const next = jest.fn();
    business.changeFlag.mockResolvedValueOnce({ test: "test" });
    await clientController.changeFlag(req, res, next);
    expect(business.changeFlag).toHaveBeenCalledWith(req.body);
  });
});

/**
 * Tests the "changeFlag" function of the "clientController".
 */
describe("changeFlag", () => {
  /**
   * It tests sending error messages
   */
  it("should call business.changeFlag with the correct params", async () => {
    const req = { query: { project: "test" } };
    const res = { send: jest.fn(), status: jest.fn() };
    const next = jest.fn();
    business.changeFlag.mockRejectedValue(new Error("test"));
    await clientController.changeFlag(req, res, next);
    expect(res.send).toHaveBeenCalledWith("test");
  });
});

/**
 * Tests the "getNumberOfFlags" function of the "clientController".
 */
describe("getNumberOfFlags", () => {
  /**
   * It tests whether the "business.getNumberOfFlags" function is called once.
   */
  it("should call business.getNumberOfFlags once", async () => {
    const req = { query: { project: "test" } };
    const res = { send: jest.fn() };
    const next = jest.fn();
    business.getNumberOfFlags.mockResolvedValueOnce({ test: "test" });
    await clientController.getNumberOfFlags(req, res, next);
    expect(business.getNumberOfFlags).toHaveBeenCalledTimes(1);
  });
});

/**
 * Tests the "getNumberOfFlags" function of the "clientController".
 */
describe("getNumberOfFlags", () => {
  /**
   * It tests sending error messages
   */
  it("should call business.getNumberOfFlags with the correct params", async () => {
    const req = { query: { project: "test" } };
    const res = { send: jest.fn(), status: jest.fn() };
    const next = jest.fn();
    business.getNumberOfFlags.mockRejectedValue(new Error("test"));
    await clientController.getNumberOfFlags(req, res, next);
    expect(res.send).toHaveBeenCalledWith("test");
  });
});
