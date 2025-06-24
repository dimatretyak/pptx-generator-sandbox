// overallPath: stv, sectionPath: topKpi
export const stvTopKpi = {
  reportName: "overall",
  overallPath: "stv",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "stv",
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
      platform: ["xandr", "basis", "simplifi", "madhive", "dv360"],
      product: [
        "Addressable Solutions",
        "Blended Tactics",
        "Hulu",
        "Netflix",
        "STV",
        "YouTube TV",
        "",
      ],
      subProduct: ["Addressable STV", "Targeted STV", "STV", "Hulu", "Netflix"],
      reportType: [
        "performance",
        "campaign",
        "network_analytics",
        "videoInteraction",
        "netflix_video_analytics",
      ],
    },
    fields: [
      "impressions",
      "videoCompletions",
      "conversions",
      "videoStarts",
      "video25Pcts",
      "video50Pcts",
      "video75Pcts",
      "clicks",
    ],
  },
  result: {
    data: [
      {
        _id: 1,
        impressions: 28885490,
        conversions: 2006,
        clicks: 131,
        videoCompletions: 28461592,
        videoStarts: 28911334,
        video25Pcts: 28755655,
        video50Pcts: 28653821,
        video75Pcts: 28572288,
        ctr: 0.0004535148962333684,
        vcr: 98.44440937938042,
        conversionsRate: 0.006944663220184251,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
