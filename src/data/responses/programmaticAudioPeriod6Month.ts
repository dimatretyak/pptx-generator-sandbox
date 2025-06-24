export const programmaticAudioPeriod6Month = {
  reportName: "overall",
  overallPath: "programmaticaudio",
  sectionPath: "period6Month",
  params: {
    page: 0,
    pageSize: 10,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "period6Month",
    sortModel: [],
    overallPath: "programmaticaudio",
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
        field: "videoCompletions",
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
      platform: ["basis", "tradedesk"],
      product: ["Programmatic Audio"],
      subProduct: ["Programmatic Audio"],
      reportType: ["performance"],
    },
    fields: ["clicks", "impressions", "videoStarts", "videoCompletions"],
  },
  result: {
    data: [
      {
        clicks: 45601,
        impressions: 17211117,
        _id: {
          monthYearNumbers: "2024-12",
        },
        videoStarts: 17302692,
        videoCompletions: 16332132,
        ctr: 0.26495084543321623,
        vcr: 94.39069943567164,
      },
      {
        clicks: 27335,
        impressions: 12629675,
        _id: {
          monthYearNumbers: "2025-01",
        },
        videoStarts: 12757052,
        videoCompletions: 12056533,
        ctr: 0.21643470635626014,
        vcr: 94.50877052159072,
      },
      {
        clicks: 6495,
        impressions: 12810766,
        _id: {
          monthYearNumbers: "2025-02",
        },
        videoStarts: 13013662,
        videoCompletions: 12483938,
        ctr: 0.05069954443005204,
        vcr: 95.92947780570911,
      },
      {
        clicks: 8538,
        impressions: 14711896,
        _id: {
          monthYearNumbers: "2025-03",
        },
        videoStarts: 14911049,
        videoCompletions: 14280484,
        ctr: 0.05803466799928438,
        vcr: 95.77115600652913,
      },
      {
        clicks: 6106,
        impressions: 17370389,
        _id: {
          monthYearNumbers: "2025-04",
        },
        videoStarts: 17315930,
        videoCompletions: 16701215,
        ctr: 0.03515177466664679,
        vcr: 96.45000297413999,
      },
      {
        clicks: 3553,
        impressions: 16681453,
        _id: {
          monthYearNumbers: "2025-05",
        },
        videoStarts: 15990216,
        videoCompletions: 15340292,
        ctr: 0.021299103861036565,
        vcr: 95.93548955186097,
      },
    ],
    metadata: {
      totalRecords: 6,
    },
  },
  isCached: false,
};
