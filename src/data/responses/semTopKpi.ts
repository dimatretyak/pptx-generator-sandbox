// overallPath: "sem", sectionPath: "topKpi"
export const semTopKpi = {
  reportName: "overall",
  overallPath: "sem",
  sectionPath: "topKpi",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "topKpi",
    sortModel: [],
    overallPath: "sem",
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
      platform: ["googleads", "microsoftad"],
      subProduct: ["SEM", "Unknown"],
      reportType: ["reportCampaign", "reportSpark"],
    },
    fields: [
      "clicks",
      "impressions",
      "conversions",
      "allconversions",
      "interactions",
    ],
  },
  result: {
    data: [
      {
        _id: 1,
        clicks: 544928,
        impressions: 6120953,
        conversions: 87946,
        interactions: 652847,
        allConversions: 125882.73684983421,
        ctr: 8.902665973746245,
        conversionsRate: 13.471150208241747,
        allconversionsRate: 19.282159525891977,
      },
    ],
    metadata: {
      totalRecords: 1,
    },
  },
  isCached: false,
};
