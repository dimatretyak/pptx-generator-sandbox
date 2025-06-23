// overallPath: "socialvideo", sectionPath: "topKpi"
export const socialVideoTopKpi = {
  reportName: "overall",
  overallPath: "socialvideo",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "socialvideo",
  },
  pipeline: {
    timePeriod: "last30Days",
    customMatch: "videoStarts >= 1",
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
      platform: ["snapchat", "tiktok", "pinterest", "meta", "linkedin"],
      product: ["SnapChat", "TikTok", "Pinterest", "Meta", "LinkedIn"],
      subProduct: [
        "Awareness",
        "Conversions",
        "Endorsements",
        "Lead Gen",
        "Link Clicks",
        "Post Engagement",
        "Sponsored Social Mentions",
        "Swipe Up",
        "ThruPlay",
        "Unknown",
      ],
      reportType: ["campaign", "basic"],
    },
    fields: ["videoStarts", "videoCompletions"],
  },
  result: {
    data: [
      {
        _id: 1,
        videoStarts: 32572574,
        videoCompletions: 2457979,
        vcr: 7.546161381044064,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
