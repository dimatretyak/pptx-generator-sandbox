export const displayProduct = {
  reportName: "overall",
  overallPath: "display",
  sectionPath: "product",
  params: {
    page: 0,
    pageSize: 5,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "product",
    sortModel: [],
    overallPath: "display",
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
    group: {
      subProduct: "subProduct",
    },
    periodFilter: {
      startDate: "2025-05-24T00:00:00.000Z",
      endDate: "2025-06-22T23:59:59.999Z",
    },
    basicMatch: {
      platform: ["simplifi", "xandr", "basis", "tradedesk", "nextdoor"],
      subProduct: [
        "Addressable Display",
        "Event Targeting",
        "Geo-Fencing w/ Foot Traffic",
        "Social Display",
        "Targeted Display",
        "Targeted Native",
      ],
    },
    fields: ["clicks", "impressions", "conversions"],
  },
  result: {
    data: [
      {
        clicks: 144135,
        impressions: 108736375,
        conversions: 96752,
        _id: {
          subProduct: "Targeted Display",
        },
        ctr: 0.13255453844217266,
        conversionsRate: 0.0889785042034002,
      },
      {
        clicks: 67405,
        impressions: 32187470,
        conversions: 3121,
        _id: {
          subProduct: "Addressable Display",
        },
        ctr: 0.20941378741479214,
        conversionsRate: 0.009696319716958182,
      },
      {
        clicks: 41551,
        impressions: 22928000,
        conversions: 5101,
        _id: {
          subProduct: "Geo-Fencing w/ Foot Traffic",
        },
        ctr: 0.1812238311235171,
        conversionsRate: 0.02224790648988137,
      },
      {
        clicks: 7269,
        impressions: 2365567,
        conversions: 573,
        _id: {
          subProduct: "Social Display",
        },
        ctr: 0.30728362375701046,
        conversionsRate: 0.024222522549562114,
      },
      {
        clicks: 3157,
        impressions: 1991708,
        conversions: 227,
        _id: {
          subProduct: "Targeted Native",
        },
        ctr: 0.15850717072984594,
        conversionsRate: 0.011397253010983538,
      },
    ],
    metadata: {
      totalRecords: 5,
    },
  },
  isCached: false,
};
