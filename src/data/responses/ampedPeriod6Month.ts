export const ampedPeriod6Month = {
  reportName: "overall",
  overallPath: "amped",
  sectionPath: "period6Month",
  params: {
    page: 0,
    pageSize: 10,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "period6Month",
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
        $limit: 10,
      },
    ],
    sortModel: [
      {
        field: "clicks",
        sort: "desc ",
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
        clicks: 95219,
        impressions: 87827179,
        _id: {
          monthYearNumbers: "2024-12",
        },
        ctr: 0.10841632520156431,
      },
      {
        clicks: 88331,
        impressions: 77134586,
        _id: {
          monthYearNumbers: "2025-01",
        },
        ctr: 0.11451542632250596,
      },
      {
        clicks: 99814,
        impressions: 74429333,
        _id: {
          monthYearNumbers: "2025-02",
        },
        ctr: 0.13410572952467545,
      },
      {
        clicks: 95558,
        impressions: 65190201,
        _id: {
          monthYearNumbers: "2025-03",
        },
        ctr: 0.14658337991625459,
      },
      {
        clicks: 117245,
        impressions: 71402124,
        _id: {
          monthYearNumbers: "2025-04",
        },
        ctr: 0.16420379875534236,
      },
      {
        clicks: 110656,
        impressions: 75424690,
        _id: {
          monthYearNumbers: "2025-05",
        },
        ctr: 0.1467105797849484,
      },
    ],
    metadata: {
      totalRecords: 6,
    },
  },
  isCached: false,
};
