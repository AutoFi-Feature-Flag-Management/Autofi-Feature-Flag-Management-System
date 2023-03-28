const clientController = require("../clientController/clientController");
const business = require("../businessLayer/business");

jest.mock("../businessLayer/business");

describe("getFeatureFlags", () => {
  it("should call business.getFeatureFlags with the correct params", async () => {
    const req = { query: { project: "test" } };
    const res = { send: jest.fn() };
    const next = jest.fn();
    business.getFeatureFlags.mockResolvedValueOnce({ test: "test" });
    await clientController.getFeatureFlags(req, res, next);
    expect(business.getFeatureFlags).toHaveBeenCalledWith(req.query);
  });
});

describe("getFeatureFlag", () => {
  it("should call business.getFeatureFlag with the correct params", async () => {
    const req = { params: { key: "test" } };
    const res = { send: jest.fn() };
    const next = jest.fn();
    business.getFeatureFlag.mockResolvedValueOnce({ test: "test" });
    await clientController.getFeatureFlag(req, res, next);
    expect(business.getFeatureFlag).toHaveBeenCalledWith(req.params);
  });
});

describe("changeFlag", () => {
  it("should call business.changeFlag with the correct body", async () => {
    const req = { body: { key: "test" } };
    const res = { send: jest.fn() };
    const next = jest.fn();
    business.changeFlag.mockResolvedValueOnce({ test: "test" });
    await clientController.changeFlag(req, res, next);
    expect(business.changeFlag).toHaveBeenCalledWith(req.body);
  });
});

describe("getNumberOfFlags", () => {
  it("should call business.getNumberOfFlags once", async () => {
    const req = { query: { project: "test" } };
    const res = { send: jest.fn() };
    const next = jest.fn();
    business.getNumberOfFlags.mockResolvedValueOnce({ test: "test" });
    await clientController.getNumberOfFlags(req, res, next);
    expect(business.getNumberOfFlags).toHaveBeenCalledTimes(1);
  });
});
