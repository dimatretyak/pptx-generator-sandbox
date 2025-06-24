export const programmaticAudioTopKpi = {
  reportName: "overall",
  overallPath: "programmaticaudio",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
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
        $limit: 5,
      },
    ],
    sortModel: [
      {
        field: "videoCompletions",
        sort: "desc nulls last",
      },
    ],
    periodFilter: {
      startDate: "2025-05-24T00:00:00.000Z",
      endDate: "2025-06-22T23:59:59.999Z",
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
        _id: 1,
        clicks: 2937,
        impressions: 15681187,
        videoStarts: 15670113,
        videoCompletions: 15185688,
        ctr: 0.01872944949894418,
        vcr: 96.90860557291451,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
