// overallPath: "stv", sectionPath: "product"
export const stvProduct = {
  reportName: "overall",
  overallPath: "stv",
  sectionPath: "product",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "product",
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
    group: {
      subProduct: "subProduct",
    },
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
        impressions: 7351054,
        conversions: 2005,
        clicks: 82,
        _id: {
          subProduct: "Addressable STV",
        },
        videoCompletions: 7260689,
        videoStarts: 7375042,
        video25Pcts: 7329041,
        video50Pcts: 7302972,
        video75Pcts: 7283772,
        ctr: 0.0011154862962508504,
        vcr: 98.44945967765337,
        conversionsRate: 0.027275000292475066,
      },
      {
        impressions: 19813540,
        conversions: 1,
        clicks: 49,
        _id: {
          subProduct: "Targeted STV",
        },
        videoCompletions: 19501264,
        videoStarts: 19796546,
        video25Pcts: 19713485,
        video50Pcts: 19642078,
        video75Pcts: 19584158,
        ctr: 0.00024730563039214595,
        vcr: 98.50841656923384,
        conversionsRate: 0.000005047053681472367,
      },
      {
        impressions: 1332716,
        conversions: 0,
        clicks: 0,
        _id: {
          subProduct: "STV",
        },
        videoCompletions: 1315261,
        videoStarts: 1351698,
        video25Pcts: 1326558,
        video50Pcts: 1323062,
        video75Pcts: 1319340,
        vcr: 97.30435348724346,
      },
      {
        impressions: 388180,
        conversions: null,
        clicks: null,
        _id: {
          subProduct: "Hulu",
        },
        videoCompletions: 384378,
        videoStarts: 388048,
        video25Pcts: 386571,
        video50Pcts: 385709,
        video75Pcts: 385018,
        vcr: 99.05424071248918,
      },
    ],
    metadata: {
      totalRecords: 4,
    },
  },
  isCached: false,
};
