export const endorsementTopKpi = {
  reportName: "overall",
  overallPath: "endorsement",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "endorsement",
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
        sort: "desc nulls last",
      },
    ],
    periodFilter: {
      startDate: "2025-05-24T00:00:00.000Z",
      endDate: "2025-06-22T23:59:59.999Z",
    },
    basicMatch: {
      platform: ["gam", "meta"],
      product: ["Local Digital Endorsement", "Meta"],
      subProduct: ["Local Digital Endorsement", "Endorsements"],
      reportType: ["campaign"],
    },
    fields: ["clicks", "impressions"],
  },
  result: {
    data: [
      {
        _id: 1,
        clicks: 34301,
        impressions: 2093831,
        ctr: 1.6381933403412214,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
