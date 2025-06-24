export const callTrackingPeriod6Month = {
  reportName: "overall",
  overallPath: "calltracking",
  sectionPath: "period6Month",
  params: {
    page: 0,
    pageSize: 10,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "period6Month",
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
        $limit: 10,
      },
    ],
    sortModel: [
      {
        field: "callCount",
        sort: "desc nulls last",
      },
    ],
    group: {
      monthYearNumbers: "TO_CHAR(reportDate, 'YYYY-MM')",
      callCount: "1",
      firstCall: "CASE WHEN firstCall = true THEN 1 ELSE 0 END",
      answeredCalls: "CASE WHEN callType = 'answered' THEN 1 ELSE 0 END",
    },
    periodFilter: {
      startDate: "2024-12-01T00:00:00.000Z",
      endDate: "2025-05-31T23:59:59.999Z",
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
        _id: {
          monthYearNumbers: "2024-12",
        },
        callCount: 18831,
        firstCall: 12833,
        answeredCalls: 16749,
        answeredRate: 88.94376294408157,
      },
      {
        _id: {
          monthYearNumbers: "2025-01",
        },
        callCount: 17525,
        firstCall: 12146,
        answeredCalls: 15728,
        answeredRate: 89.74607703281026,
      },
      {
        _id: {
          monthYearNumbers: "2025-02",
        },
        callCount: 17027,
        firstCall: 11793,
        answeredCalls: 15222,
        answeredRate: 89.39918952252305,
      },
      {
        _id: {
          monthYearNumbers: "2025-03",
        },
        callCount: 18214,
        firstCall: 12778,
        answeredCalls: 16318,
        answeredRate: 89.59042494784232,
      },
      {
        _id: {
          monthYearNumbers: "2025-04",
        },
        callCount: 19176,
        firstCall: 13329,
        answeredCalls: 17280,
        answeredRate: 90.11264080100125,
      },
      {
        _id: {
          monthYearNumbers: "2025-05",
        },
        callCount: 19052,
        firstCall: 13098,
        answeredCalls: 16956,
        answeredRate: 88.99853033802225,
      },
    ],
    metadata: {
      totalRecords: 6,
    },
  },
  isCached: false,
};
