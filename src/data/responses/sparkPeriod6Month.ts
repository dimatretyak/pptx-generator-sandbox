// "overallPath": "spark", "sectionPath": "period6Month",
export const sparkPeriod6Month = {
  reportName: "overall",
  overallPath: "spark",
  sectionPath: "period6Month",
  params: {
    page: 0,
    pageSize: 10,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "period6Month",
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
        $limit: 10,
      },
    ],
    sortModel: [
      {
        field: "clicks",
        sort: "desc nulls last",
      },
    ],
    group: {
      monthYearNumbers: "TO_CHAR(reportDate, 'YYYY-MM')",
    },
    periodFilter: {
      startDate: "2024-12-01T00:00:00.000Z",
      endDate: "2025-05-31T23:59:59.999Z",
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
        clicks: 515298,
        impressions: 21969344,
        conversions: 198580,
        interactions: 1007918,
        _id: {
          monthYearNumbers: "2024-12",
        },
        allConversions: 291731.375799573,
        ctr: 2.3455320286304406,
        conversionsRate: 19.701999567425126,
        allconversionsRate: 28.943922025402863,
      },
      {
        clicks: 483825,
        impressions: 20458631,
        conversions: 201858,
        interactions: 1112988,
        _id: {
          monthYearNumbers: "2025-01",
        },
        allConversions: 274123.3563727583,
        ctr: 2.364894307932921,
        conversionsRate: 18.13658368284294,
        allconversionsRate: 24.62946590619126,
      },
      {
        clicks: 499420,
        impressions: 26693401,
        conversions: 170813,
        interactions: 1138228,
        _id: {
          monthYearNumbers: "2025-02",
        },
        allConversions: 247357.2187842289,
        ctr: 1.8709493031629805,
        conversionsRate: 15.006923041780734,
        allconversionsRate: 21.731762001989058,
      },
      {
        clicks: 505337,
        impressions: 25221324,
        conversions: 189983,
        interactions: 1104117,
        _id: {
          monthYearNumbers: "2025-03",
        },
        allConversions: 264402.5922524845,
        ctr: 2.0036101197542204,
        conversionsRate: 17.206781527682303,
        allconversionsRate: 23.947009239057092,
      },
      {
        clicks: 520499,
        impressions: 27373618,
        conversions: 167879,
        interactions: 1102287,
        _id: {
          monthYearNumbers: "2025-04",
        },
        allConversions: 230940.3833051729,
        ctr: 1.9014622034982733,
        conversionsRate: 15.23006258805556,
        allconversionsRate: 20.950986449082677,
      },
      {
        clicks: 507921,
        impressions: 18709294,
        conversions: 212494,
        interactions: 1134467,
        _id: {
          monthYearNumbers: "2025-05",
        },
        allConversions: 257079.41387615493,
        ctr: 2.714805807210042,
        conversionsRate: 18.73073434485093,
        allconversionsRate: 22.660773737799335,
      },
    ],
    metadata: {
      totalRecords: 6,
    },
  },
  isCached: false,
};
