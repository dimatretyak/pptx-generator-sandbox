export const displayTopKpi = {
  reportName: "overall",
  overallPath: "display",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "display",
  },
  pipeline: {
    timePeriod: "last30Days",
    customMatch: "impressions >= 5",
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
        sort: "desc nulls last",
      },
    ],
    periodFilter: {
      startDate: "2025-05-24T00:00:00.000Z",
      endDate: "2025-06-22T23:59:59.999Z",
    },
    basicMatch: {
      platform: ["simplifi", "xandr", "basis", "tradedesk", "nextdoor"],
      subProduct: [
        "Addressable Display",
        "Event Targeting",
        "Geo-Fencing w/ Foot Traffic",
        "Social Display",
        "Targeted Display",
        "Targeted Native",
      ],
    },
    fields: ["clicks", "impressions", "conversions"],
  },
  result: {
    data: [
      {
        _id: 1,
        clicks: 263517,
        impressions: 168209120,
        conversions: 105774,
        ctr: 0.15666035230432215,
        conversionsRate: 0.06288244061915312,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: true,
};
