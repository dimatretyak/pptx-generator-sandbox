export const endorsementPeriod6Month = {
  reportName: "overall",
  overallPath: "endorsement",
  sectionPath: "period6Month",
  params: {
    page: 0,
    pageSize: 10,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "period6Month",
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
        $limit: 10,
      },
    ],
    sortModel: [
      {
        field: "clicks",
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
        clicks: 25915,
        impressions: 1449290,
        _id: {
          monthYearNumbers: "2024-12",
        },
        ctr: 1.7881169400189059,
      },
      {
        clicks: 22542,
        impressions: 1193031,
        _id: {
          monthYearNumbers: "2025-01",
        },
        ctr: 1.8894731151160364,
      },
      {
        clicks: 31376,
        impressions: 2719935,
        _id: {
          monthYearNumbers: "2025-02",
        },
        ctr: 1.1535569783836745,
      },
      {
        clicks: 23031,
        impressions: 1761873,
        _id: {
          monthYearNumbers: "2025-03",
        },
        ctr: 1.3071884295860143,
      },
      {
        clicks: 26561,
        impressions: 3710878,
        _id: {
          monthYearNumbers: "2025-04",
        },
        ctr: 0.7157605289098699,
      },
      {
        clicks: 39998,
        impressions: 3100855,
        _id: {
          monthYearNumbers: "2025-05",
        },
        ctr: 1.2899023011395245,
      },
    ],
    metadata: {
      totalRecords: 6,
    },
  },
  isCached: false,
};
