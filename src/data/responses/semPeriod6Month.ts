// overallPath: "sem", sectionPath: "period6Month",
export const semPeriod6Month = {
  reportName: "overall",
  overallPath: "sem",
  sectionPath: "period6Month",
  params: {
    page: 0,
    pageSize: 10,
    advancedSearch: {
      timePeriod: "last30Days",
    },
    sectionPath: "period6Month",
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
        clicks: 499840,
        impressions: 8073430,
        conversions: 66058,
        interactions: 501518,
        _id: {
          monthYearNumbers: "2024-12",
        },
        allConversions: 129834.10267722094,
        ctr: 6.1911727729106465,
        conversionsRate: 13.171610989037283,
        allconversionsRate: 25.88820341443378,
      },
      {
        clicks: 489097,
        impressions: 8638588,
        conversions: 57121,
        interactions: 507744,
        _id: {
          monthYearNumbers: "2025-01",
        },
        allConversions: 122162.00177677581,
        ctr: 5.66177018744267,
        conversionsRate: 11.249960610071218,
        allconversionsRate: 24.05976239994958,
      },
      {
        clicks: 443888,
        impressions: 6671555,
        conversions: 59014,
        interactions: 510259,
        _id: {
          monthYearNumbers: "2025-02",
        },
        allConversions: 121819.38340270706,
        ctr: 6.653441364119759,
        conversionsRate: 11.565499089677987,
        allconversionsRate: 23.8739542075691,
      },
      {
        clicks: 505592,
        impressions: 6282564,
        conversions: 71965,
        interactions: 602422,
        _id: {
          monthYearNumbers: "2025-03",
        },
        allConversions: 131566.80637695687,
        ctr: 8.047542372827401,
        conversionsRate: 11.945944869211283,
        allconversionsRate: 21.8396738498926,
      },
      {
        clicks: 506513,
        impressions: 6534549,
        conversions: 77291,
        interactions: 560579,
        _id: {
          monthYearNumbers: "2025-04",
        },
        allConversions: 133350.85580142913,
        ctr: 7.751307703102387,
        conversionsRate: 13.787708779672444,
        allconversionsRate: 23.788083392349694,
      },
      {
        clicks: 551841,
        impressions: 7518567,
        conversions: 89071,
        interactions: 711980,
        _id: {
          monthYearNumbers: "2025-05",
        },
        allConversions: 128477.66293678898,
        ctr: 7.339709814383512,
        conversionsRate: 12.51032332368887,
        allconversionsRate: 18.045169808140678,
      },
    ],
    metadata: {
      totalRecords: 6,
    },
  },
  isCached: false,
};
