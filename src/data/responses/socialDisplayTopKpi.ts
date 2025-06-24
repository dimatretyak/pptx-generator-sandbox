export const socialDisplayTopKpi = {
  reportName: "overall",
  overallPath: "socialdisplay",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "socialdisplay",
  },
  pipeline: {
    timePeriod: "last30Days",
    customMatch: "impressions >= 5",
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
    fields: [
      "impressions",
      "pageEngagements",
      "conversions",
      "clicks",
      "video25Pcts",
      "video50Pcts",
      "video75Pcts",
      "videoStarts",
      "videoCompletions",
    ],
  },
  result: {
    data: [
      {
        _id: 1,
        impressions: 408136770,
        pageengagements: 8213120,
        conversions: 774137,
        clicks: 5482618,
        video25Pcts: 8178968,
        video50Pcts: 4866860,
        video75Pcts: 3374573,
        videoStarts: 32535270,
        videoCompletions: 2473143,
        ctr: 1.3433286101617359,
        vcr: 7.60142147275864,
        conversionsRate: 0.18967587752507573,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
