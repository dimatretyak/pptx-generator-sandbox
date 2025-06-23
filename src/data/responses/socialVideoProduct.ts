// overallPath: "socialvideo", sectionPath: "product"
export const socialVideoProduct = {
  reportName: "overall",
  overallPath: "socialvideo",
  sectionPath: "product",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "product",
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
    group: {
      platform: "platform",
      subProduct: "subProduct",
    },
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
        _id: {
          subProduct: "Link Clicks",
          platform: "meta",
        },
        videoStarts: 10703604,
        videoCompletions: 1227691,
        vcr: 11.469884349234146,
      },
      {
        _id: {
          subProduct: "Conversions",
          platform: "meta",
        },
        videoStarts: 7054509,
        videoCompletions: 716844,
        vcr: 10.16150096342637,
      },
      {
        _id: {
          subProduct: "Sponsored Social Mentions",
          platform: "meta",
        },
        videoStarts: 4727701,
        videoCompletions: 234306,
        vcr: 4.956024080203041,
      },
      {
        _id: {
          subProduct: "Awareness",
          platform: "meta",
        },
        videoStarts: 2670619,
        videoCompletions: 79873,
        vcr: 2.9908047535047118,
      },
      {
        _id: {
          subProduct: "Link Clicks",
          platform: "tiktok",
        },
        videoStarts: 2366616,
        videoCompletions: 49685,
        vcr: 2.099411142323047,
      },
      {
        _id: {
          subProduct: "Lead Gen",
          platform: "meta",
        },
        videoStarts: 1099048,
        videoCompletions: 47828,
        vcr: 4.351766255886913,
      },
      {
        _id: {
          subProduct: "ThruPlay",
          platform: "meta",
        },
        videoStarts: 194279,
        videoCompletions: 27194,
        vcr: 13.997395498226778,
      },
      {
        _id: {
          subProduct: "Link Clicks",
          platform: "pinterest",
        },
        videoStarts: 152256,
        videoCompletions: 26873,
        vcr: 17.64987915090374,
      },
      {
        _id: {
          subProduct: "Unknown",
          platform: "meta",
        },
        videoStarts: 755688,
        videoCompletions: 22761,
        vcr: 3.0119573157175976,
      },
      {
        _id: {
          subProduct: "Awareness",
          platform: "tiktok",
        },
        videoStarts: 1934646,
        videoCompletions: 14599,
        vcr: 0.7546083366155876,
      },
      {
        _id: {
          subProduct: "Conversions",
          platform: "pinterest",
        },
        videoStarts: 27488,
        videoCompletions: 8921,
        vcr: 32.45416181606519,
      },
      {
        _id: {
          subProduct: "Unknown",
          platform: "tiktok",
        },
        videoStarts: 880625,
        videoCompletions: 973,
        vcr: 0.11048970901348473,
      },
      {
        _id: {
          subProduct: "Post Engagement",
          platform: "meta",
        },
        videoStarts: 5463,
        videoCompletions: 425,
        vcr: 7.779608273842212,
      },
      {
        _id: {
          subProduct: "Endorsements",
          platform: "meta",
        },
        videoStarts: 25,
        videoCompletions: 6,
        vcr: 24,
      },
      {
        _id: {
          subProduct: "Awareness",
          platform: "pinterest",
        },
        videoStarts: 7,
        videoCompletions: 0,
      },
    ],
    metadata: {
      totalRecords: 15,
    },
  },
  isCached: false,
};
