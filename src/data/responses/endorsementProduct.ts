export const endorsementProduct = {
  reportName: "overall",
  overallPath: "endorsement",
  sectionPath: "product",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "product",
    sortModel: [],
    overallPath: "endorsement",
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
      platform: ["gam", "meta"],
      product: ["Local Digital Endorsement", "Meta"],
      subProduct: ["Local Digital Endorsement", "Endorsements"],
      reportType: ["campaign"],
    },
    fields: ["clicks", "impressions"],
  },
  result: {
    data: [
      {
        clicks: 34230,
        impressions: 2033871,
        _id: {
          subProduct: "Endorsements",
        },
        ctr: 1.6829975942427027,
      },
      {
        clicks: 71,
        impressions: 59960,
        _id: {
          subProduct: "Local Digital Endorsement",
        },
        ctr: 0.11841227484989993,
      },
    ],
    metadata: {
      totalRecords: 2,
    },
  },
  isCached: false,
};
