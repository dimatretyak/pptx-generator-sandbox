// overallPath: "spark", sectionPath: "topKpi",
export const sparkTopKpi = {
  reportName: "overall",
  overallPath: "spark",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "spark",
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
      platform: ["googleads"],
      product: ["SPARK"],
      subProduct: ["SPARK"],
      reportType: ["reportSpark"],
    },
    fields: [
      "clicks",
      "impressions",
      "conversions",
      "allConversions",
      "interactions",
    ],
  },
  result: {
    data: [
      {
        _id: 1,
        clicks: 474995,
        impressions: 17509874,
        conversions: 209643,
        interactions: 1160875,
        allConversions: 245574.7803457519,
        ctr: 2.712726545033962,
        conversionsRate: 18.05905028534511,
        allconversionsRate: 21.154301712070637,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
