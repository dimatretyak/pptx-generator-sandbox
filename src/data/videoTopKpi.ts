export const videoTopKpi = {
  reportName: "overall",
  overallPath: "video",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "video",
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
        field: "clicks",
        sort: "desc nulls last",
      },
    ],
    periodFilter: {
      startDate: "2025-05-24T00:00:00.000Z",
      endDate: "2025-06-22T23:59:59.999Z",
    },
    basicMatch: {
      platform: ["basis", "simplifi", "xandr", "googleads"],
      product: ["Addressable Solutions", "Blended Tactics", "YouTube"],
      subProduct: [
        "Addressable Video",
        "Event Targeting",
        "Geo-Fencing w/Foot Traffic",
        "Targeted Video",
        "YouTube Bumper",
        "YouTube True View",
        "Targeted Native",
      ],
      reportType: [
        "performance",
        "reportYoutube",
        "reportSpark",
        "reportYoutubeSpark",
        "network_analytics",
        "videoInteraction",
      ],
    },
    fields: [
      "clicks",
      "impressions",
      "videoCompletions",
      "videoStarts",
      "video25Pcts",
      "video50Pcts",
      "video75Pcts",
      "conversions",
    ],
  },
  result: {
    data: [
      {
        _id: 1,
        clicks: 38831,
        impressions: 23683618,
        conversions: 8287,
        videoCompletions: 10658642,
        videoStarts: 11428336,
        video25Pcts: 13855775,
        video50Pcts: 12295626,
        video75Pcts: 11414725,
        ctr: 0.16395721295622992,
        vcr: 45.00428101821267,
        conversionsRate: 0.03499043093838112,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
