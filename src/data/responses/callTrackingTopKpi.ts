export const callTrackingTopKpi = {
  reportName: "overall",
  overallPath: "calltracking",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "calltracking",
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
        field: "callCount",
        sort: "desc nulls last",
      },
    ],
    group: {
      _id: "1",
      callCount: "1",
      firstCall: "CASE WHEN firstCall = true THEN 1 ELSE 0 END",
      answeredCalls: "CASE WHEN callType = 'answered' THEN 1 ELSE 0 END",
    },
    periodFilter: {
      startDate: "2025-05-24T00:00:00.000Z",
      endDate: "2025-06-22T23:59:59.999Z",
    },
    basicMatch: {
      platform: ["callrail"],
      product: ["Call Tracking"],
      subProduct: ["Call Tracking"],
      reportType: ["campaign"],
    },
    fields: [
      {
        callCount: "SUM",
      },
      {
        firstCall: "SUM",
      },
      {
        answeredCalls: "SUM",
      },
    ],
  },
  result: {
    data: [
      {
        _id: 1,
        callCount: 18556,
        firstCall: 12706,
        answeredCalls: 16477,
        answeredRate: 88.79607674067687,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
