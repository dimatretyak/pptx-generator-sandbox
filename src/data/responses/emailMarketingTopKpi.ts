// overallPath: "emailmarketing", sectionPath: "topKpi",
export const emailMarketingTopKpi = {
  reportName: "overall",
  overallPath: "emailmarketing",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "emailmarketing",
  },
  pipeline: {
    timePeriod: "last30Days",
    customMatch: "",
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
        field: "opens",
        sort: "desc nulls last",
      },
    ],
    periodFilter: {
      startDate: "2025-05-24T00:00:00.000Z",
      endDate: "2025-06-22T23:59:59.999Z",
    },
    basicMatch: {
      platform: ["adsdirect", "leadme"],
      product: ["Email Marketing"],
      subProduct: ["Email Marketing"],
      reportType: ["campaign"],
    },
    fields: ["clicks", "opens"],
  },
  result: {
    data: [
      {
        _id: 1,
        clicks: 295618,
        opens: 3268455,
        clickRate: 9.0445791666093,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
