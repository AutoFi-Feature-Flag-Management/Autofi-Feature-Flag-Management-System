const launchDarklyController = require("../app/featureFlagController/launchDarklyController");
const axios = require("axios");

jest.mock("axios");
/**
 * Tests the "launchDarklyController".
 */
describe("launchDarklyController", () => {
  /**
   * Tests the retrieval of all feature flags.
   * @async
   */
  it("getting all feature flags", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [
        {
          key: "test1",
          name: "Test1",
          value: false,
          lastUpdatedDate: "2023-03-23T20:25:34.947Z",
          description: "This is a test",
        },
        {
          key: "test2",
          name: "Test2",
          value: false,
          lastUpdatedDate: "2023-03-23T20:29:56.438Z",
          description: "Test 2 flag",
        },
        {
          key: "test3",
          name: "test3",
          value: true,
          lastUpdatedDate: "2023-03-23T20:37:28.045Z",
          description: "",
        },
      ],
    });

    const data = await launchDarklyController.getFeatureFlags({});
    expect(data).toEqual([
      {
        key: "test1",
        name: "Test1",
        value: false,
        lastUpdatedDate: "2023-03-23T20:25:34.947Z",
        description: "This is a test",
      },
      {
        key: "test2",
        name: "Test2",
        value: false,
        lastUpdatedDate: "2023-03-23T20:29:56.438Z",
        description: "Test 2 flag",
      },
      {
        key: "test3",
        name: "test3",
        value: true,
        lastUpdatedDate: "2023-03-23T20:37:28.045Z",
        description: "",
      },
    ]);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  /**
   * Tests the retrieval of a single feature flag.
   * @async
   */
  it("getting single feature flag", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [
        {
          key: "test1",
          name: "Test1",
          value: false,
          lastUpdatedDate: "2023-03-23T20:25:34.947Z",
          description: "This is a test",
        },
      ],
    });

    const data = await launchDarklyController.getFeatureFlag({ key: "test1" });
    expect(data).toEqual([
      {
        key: "test1",
        name: "Test1",
        value: false,
        lastUpdatedDate: "2023-03-23T20:25:34.947Z",
        description: "This is a test",
      },
    ]);
    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  /**
   * Tests the retrieval of all feature flags with a limit of 1.
   * @async
   */
  it("getting all feature flags with limit of 1", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [
        {
          key: "test1",
          name: "Test1",
          value: false,
          lastUpdatedDate: "2023-03-23T20:25:34.947Z",
          description: "This is a test",
        },
      ],
    });

    const data = await launchDarklyController.getFeatureFlags({ limit: 1 });
    expect(data).toEqual([
      {
        key: "test1",
        name: "Test1",
        value: false,
        lastUpdatedDate: "2023-03-23T20:25:34.947Z",
        description: "This is a test",
      },
    ]);
    expect(axios.get).toHaveBeenCalledTimes(3);
  });

  /**
   * Tests getting all feature flags with offset and limit
   * @async
   */
  it("getting all feature flags with offset of 1 and limit of 2", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [
        {
          key: "test2",
          name: "Test2",
          value: false,
          lastUpdatedDate: "2023-03-23T20:29:56.438Z",
          description: "Test 2 flag",
        },
        {
          key: "test3",
          name: "test3",
          value: true,
          lastUpdatedDate: "2023-03-23T20:37:28.045Z",
          description: "",
        },
      ],
    });

    const data = await launchDarklyController.getFeatureFlags({
      offset: 1,
      limit: 2,
    });
    expect(data).toEqual([
      {
        key: "test2",
        name: "Test2",
        value: false,
        lastUpdatedDate: "2023-03-23T20:29:56.438Z",
        description: "Test 2 flag",
      },
      {
        key: "test3",
        name: "test3",
        value: true,
        lastUpdatedDate: "2023-03-23T20:37:28.045Z",
        description: "",
      },
    ]);
    expect(axios.get).toHaveBeenCalledTimes(4);
  });

  /**
   * Tests getting a single feature flag with a key
   * @async
   */
  it("getting single feature flag", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [
        {
          key: "test1",
          name: "Test1",
          value: false,
          lastUpdatedDate: "2023-03-23T20:25:34.947Z",
          description: "This is a test",
        },
      ],
    });

    const data = await launchDarklyController.getFeatureFlag({ key: "test1" });
    expect(data).toEqual([
      {
        key: "test1",
        name: "Test1",
        value: false,
        lastUpdatedDate: "2023-03-23T20:25:34.947Z",
        description: "This is a test",
      },
    ]);
    expect(axios.get).toHaveBeenCalledTimes(5);
  });

  /**
   * Tests updating the on/off status of a feature flag.
   * @async
   */
  it("patching feature flag", async () => {
    axios.patch.mockResolvedValue({
      status: 200,
      data: [
        {
          _links: {
            parent: { href: "/api/v2/flags/default", type: "application/json" },
            self: {
              href: "/api/v2/flags/default/test1",
              type: "application/json",
            },
          },
          _maintainer: {
            _id: "63d057345bc50d127e81a2c4",
            _links: { self: [Object] },
            email: "kenneth.weech@ucalgary.ca",
            firstName: "Test",
            lastName: "Autofi",
            role: "owner",
          },
          _version: 1,
          archived: false,
          clientSideAvailability: {
            usingEnvironmentId: false,
            usingMobileKey: false,
          },
          creationDate: 1674598892868,
          customProperties: {},
          defaults: { offVariation: 1, onVariation: 0 },
          description: "This is a test",
          environments: {
            production: {
              _environmentName: "Production",
              _site: [Object],
              _summary: [Object],
              archived: false,
              contextTargets: [],
              fallthrough: [Object],
              lastModified: 1679613987954,
              offVariation: 1,
              on: true,
              prerequisites: [],
              rules: [],
              salt: "1bcd64aa6af24fec80141a2f753a1caa",
              sel: "ad56b0b98f454f0a875bc080c929c62c",
              targets: [],
              trackEvents: false,
              trackEventsFallthrough: false,
              version: 22,
            },
            test: {
              _environmentName: "Test",
              _site: [Object],
              _summary: [Object],
              archived: false,
              contextTargets: [],
              fallthrough: [Object],
              lastModified: 1674598892877,
              offVariation: 1,
              on: false,
              prerequisites: [],
              rules: [],
              salt: "3162af7fdd1a4518b8bb0abbb606917a",
              sel: "f19efce64c2648038183e087de7f4e15",
              targets: [],
              trackEvents: false,
              trackEventsFallthrough: false,
              version: 1,
            },
          },
          experiments: { baselineIdx: 0, items: [] },
          goalIds: [],
          includeInSnippet: false,
          key: "test1",
          kind: "boolean",
          maintainerId: "63d057345bc50d127e81a2c4",
          name: "Test1",
          tags: ["testtag"],
          temporary: true,
          variationJsonSchema: null,
          variations: [
            {
              _id: "a9b6218d-cfe2-4838-9650-7a387b181462",
              description: "true test description",
              name: "testTrueName",
              value: true,
            },
            {
              _id: "3d97217c-ce0c-41c8-85ee-1b5e2447d4b0",
              description: "false test description",
              name: "testFalseName",
              value: false,
            },
          ],
        },
      ],
    });

    const data = await launchDarklyController.changeFlag({ key: "test1" });
    expect(data).toEqual([
      {
        _links: {
          parent: { href: "/api/v2/flags/default", type: "application/json" },
          self: {
            href: "/api/v2/flags/default/test1",
            type: "application/json",
          },
        },
        _maintainer: {
          _id: "63d057345bc50d127e81a2c4",
          _links: { self: [Object] },
          email: "kenneth.weech@ucalgary.ca",
          firstName: "Test",
          lastName: "Autofi",
          role: "owner",
        },
        _version: 1,
        archived: false,
        clientSideAvailability: {
          usingEnvironmentId: false,
          usingMobileKey: false,
        },
        creationDate: 1674598892868,
        customProperties: {},
        defaults: { offVariation: 1, onVariation: 0 },
        description: "This is a test",
        environments: {
          production: {
            _environmentName: "Production",
            _site: [Object],
            _summary: [Object],
            archived: false,
            contextTargets: [],
            fallthrough: [Object],
            lastModified: 1679613987954,
            offVariation: 1,
            on: true,
            prerequisites: [],
            rules: [],
            salt: "1bcd64aa6af24fec80141a2f753a1caa",
            sel: "ad56b0b98f454f0a875bc080c929c62c",
            targets: [],
            trackEvents: false,
            trackEventsFallthrough: false,
            version: 22,
          },
          test: {
            _environmentName: "Test",
            _site: [Object],
            _summary: [Object],
            archived: false,
            contextTargets: [],
            fallthrough: [Object],
            lastModified: 1674598892877,
            offVariation: 1,
            on: false,
            prerequisites: [],
            rules: [],
            salt: "3162af7fdd1a4518b8bb0abbb606917a",
            sel: "f19efce64c2648038183e087de7f4e15",
            targets: [],
            trackEvents: false,
            trackEventsFallthrough: false,
            version: 1,
          },
        },
        experiments: { baselineIdx: 0, items: [] },
        goalIds: [],
        includeInSnippet: false,
        key: "test1",
        kind: "boolean",
        maintainerId: "63d057345bc50d127e81a2c4",
        name: "Test1",
        tags: ["testtag"],
        temporary: true,
        variationJsonSchema: null,
        variations: [
          {
            _id: "a9b6218d-cfe2-4838-9650-7a387b181462",
            description: "true test description",
            name: "testTrueName",
            value: true,
          },
          {
            _id: "3d97217c-ce0c-41c8-85ee-1b5e2447d4b0",
            description: "false test description",
            name: "testFalseName",
            value: false,
          },
        ],
      },
    ]);
    expect(axios.patch).toHaveBeenCalledTimes(1);
  });
});
