export const displayPeriod6Month = {
  reportName: "overall",
  overallPath: "display",
  sectionPath: "period6Month",
  params: {
    page: 0,
    pageSize: 10,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "period6Month",
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
        clicks: 216671,
        impressions: 211273477,
        conversions: 110678,
        _id: {
          monthYearNumbers: "2024-12",
        },
        ctr: 0.10255475655375332,
        conversionsRate: 0.05238613079672087,
      },
      {
        clicks: 194137,
        impressions: 154165588,
        conversions: 96079,
        _id: {
          monthYearNumbers: "2025-01",
        },
        ctr: 0.12592758378737542,
        conversionsRate: 0.06232194956503523,
      },
      {
        clicks: 190436,
        impressions: 150576341,
        conversions: 110207,
        _id: {
          monthYearNumbers: "2025-02",
        },
        ctr: 0.12647139566235044,
        conversionsRate: 0.0731901168989091,
      },
      {
        clicks: 248076,
        impressions: 198883346,
        conversions: 135048,
        _id: {
          monthYearNumbers: "2025-03",
        },
        ctr: 0.12473442597853315,
        conversionsRate: 0.06790312146095934,
      },
      {
        clicks: 283608,
        impressions: 186021512,
        conversions: 131956,
        _id: {
          monthYearNumbers: "2025-04",
        },
        ctr: 0.15245978647888853,
        conversionsRate: 0.07093588186725415,
      },
      {
        clicks: 276767,
        impressions: 181402162,
        conversions: 113505,
        _id: {
          monthYearNumbers: "2025-05",
        },
        ctr: 0.15257094896145726,
        conversionsRate: 0.06257091908309229,
      },
    ],
    metadata: {
      totalRecords: 6,
    },
  },
  isCached: true,
};
