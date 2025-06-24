// overallPath: "emailmarketing", sectionPath: "period6Month",
export const emailMarketingPeriod6Month = {
  reportName: "overall",
  overallPath: "emailmarketing",
  sectionPath: "period6Month",
  params: {
    page: 0,
    pageSize: 10,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "period6Month",
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
        $limit: 10,
      },
    ],
    sortModel: [
      {
        field: "opens",
        sort: "desc nulls last",
      },
    ],
    group: {
      monthYearNumbers: "TO_CHAR(reportDate, 'YYYY-MM')",
    },
    periodFilter: {
      startDate: "2024-12-01T00:00:00.000Z",
      endDate: "2025-05-31T23:59:59.999Z",
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
        clicks: 934733,
        opens: 5465795,
        _id: {
          monthYearNumbers: "2024-12",
        },
        clickRate: 17.10150124547298,
      },
      {
        clicks: 999168,
        opens: 3455775,
        _id: {
          monthYearNumbers: "2025-01",
        },
        clickRate: 28.912993467456648,
      },
      {
        clicks: 1476513,
        opens: 6185887,
        _id: {
          monthYearNumbers: "2025-02",
        },
        clickRate: 23.86905871381097,
      },
      {
        clicks: 915479,
        opens: 5085541,
        _id: {
          monthYearNumbers: "2025-03",
        },
        clickRate: 18.001604942325702,
      },
      {
        clicks: 418430,
        opens: 3764626,
        _id: {
          monthYearNumbers: "2025-04",
        },
        clickRate: 11.114782716795773,
      },
      {
        clicks: 730523,
        opens: 4344778,
        _id: {
          monthYearNumbers: "2025-05",
        },
        clickRate: 16.813816494191418,
      },
    ],
    metadata: {
      totalRecords: 6,
    },
  },
  isCached: false,
};
