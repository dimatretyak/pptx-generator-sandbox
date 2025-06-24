export const ampedProduct = {
  reportName: "overall",
  overallPath: "amped",
  sectionPath: "product",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "product",
    sortModel: [],
    overallPath: "amped",
  },
  pipeline: {
    timePeriod: "last30Days",
    customMatch: "impressions >= 1",
    paging: [
      {
        $skip: 0,
      },
      {
        $limit: 5,
      },
    ],
    sortModel: [
      {
        field: "clicks",
        sort: "desc ",
      },
    ],
    group: {
      subProduct: "subProduct",
    },
    periodFilter: {
      startDate: "2025-05-24T00:00:00.000Z",
      endDate: "2025-06-22T23:59:59.999Z",
    },
    basicMatch: {
      platform: ["gam"],
      product: [
        "Local Site Takeovers",
        "Local Sponsorships",
        "Local Targeted Display",
      ],
      subProduct: [
        "Local Site Takeovers",
        "Station App Loading Screen",
        "Station Site Takeover",
        "Content Sponsorship",
        "Contest Sponsorship",
        "Listen Live Sponsorship",
        "Local Sponsorships",
        "Station App Loading Screen Sponsorship",
        "Station App Title Sponsorship",
        "Weather Sponsorship",
        "All Positions - CPM",
        "All Positions - SOV",
        "Local Targeted Display",
      ],
      reportType: ["campaign"],
    },
    fields: ["clicks", "impressions"],
  },
  result: {
    data: [
      {
        clicks: 43035,
        impressions: 41838112,
        _id: {
          subProduct: "Local Targeted Display",
        },
        ctr: 0.10286076006489012,
      },
      {
        clicks: 33266,
        impressions: 7926955,
        _id: {
          subProduct: "Local Sponsorships",
        },
        ctr: 0.4196567282140494,
      },
      {
        clicks: 23186,
        impressions: 18818216,
        _id: {
          subProduct: "Local Site Takeovers",
        },
        ctr: 0.12321040421685032,
      },
    ],
    metadata: {
      totalRecords: 3,
    },
  },
  isCached: false,
};
