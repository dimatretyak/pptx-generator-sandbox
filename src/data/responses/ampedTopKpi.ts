export const ampedTopKpi = {
  reportName: "overall",
  overallPath: "amped",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
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
        _id: 1,
        clicks: 99487,
        impressions: 68583283,
        ctr: 0.14506013076101942,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
