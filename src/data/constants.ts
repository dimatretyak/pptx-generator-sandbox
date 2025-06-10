import { Card } from "../types/common";

export const cards: Array<Card[][]> = [
  [
    [
      { title: "Impressions", value: "177M" },
      { title: "Clicks", value: "269K" },
      { title: "CTR(%)", value: "0.15%" },
    ],
    [
      { title: "Impressions", value: "33.3M" },
      { title: "Site Conversions", value: "2.7K" },
    ],
    [
      { title: "Foot Traffic Visits", value: "4.4K" },
      { title: "Video Start(s)", value: "2.6M" },
      { title: "Video Complete(s)", value: "1.3M" },
    ],
  ],

  [
    [
      { title: "Impressions", value: "177M" },
      { title: "Clicks", value: "269K" },
      { title: "CTR(%)", value: "0.15%" },
    ],
    [
      { title: "VCR(%)", value: "50.41%" },
      { title: "Impressions", value: "33.3M" },
      { title: "Site Conversions", value: "2.7K" },
    ],
    [
      { title: "Foot Traffic Visits", value: "4.4K" },
      { title: "Video Start(s)", value: "2.6M" },
      { title: "Video Complete(s)", value: "1.3M" },
    ],
  ],

  [
    [
      { title: "Impressions", value: "177M" },
      { title: "Clicks", value: "269K" },
      { title: "CTR(%)", value: "0.15%" },
      { title: "VCR(%)", value: "50.41%" },
    ],
    [
      { title: "Impressions", value: "33.3M" },
      { title: "Site Conversions", value: "2.7K" },
      { title: "Foot Traffic Visits", value: "4.4K" },
      { title: "Video Start(s)", value: "2.6M" },
    ],
  ],

  [
    [
      { title: "Impressions", value: "177M" },
      { title: "Clicks", value: "269K" },
      { title: "CTR(%)", value: "0.15%" },
    ],
    [
      { title: "Impressions", value: "33.3M" },
      { title: "Total Calls", value: "17.7K" },
      { title: "Site Conversions", value: "2.7K" },
    ],
    [
      { title: "Foot Traffic Visits", value: "4.4K" },
      { title: "Video Start(s)", value: "2.6M" },
      { title: "Video Complete(s)", value: "1.3M" },
    ],
    [
      { title: "First Calls", value: "12.2K" },
      { title: "Answered Calls", value: "15.7K" },
      { title: "Answered (%)", value: "88.70%" },
    ],
  ],

  [
    [{ title: "Impressions", value: "177M" }],
    [
      { title: "Impressions", value: "33.3M" },
      { title: "Total Calls", value: "17.7K" },
      { title: "Site Conversions", value: "2.7K" },
    ],
    [
      { title: "Foot Traffic Visits", value: "4.4K" },
      { title: "Video Start(s)", value: "2.6M" },
      { title: "Video Complete(s)", value: "1.3M" },
    ],
    [
      { title: "First Calls", value: "12.2K" },
      { title: "Answered Calls", value: "15.7K" },
      { title: "Answered (%)", value: "88.70%" },
    ],
  ],
];

export const displayProductPerformance = [
  {
    clicks: 141672,
    impressions: 111262032,
    conversions: 99589,
    _id: {
      subProduct: "Targeted Display",
    },
    ctr: 0.12733184668063585,
    conversionsRate: 0.08950852164914622,
  },
  {
    clicks: 64965,
    impressions: 33309365,
    conversions: 2801,
    _id: {
      subProduct: "Addressable Display",
    },
    ctr: 0.19503524008938627,
    conversionsRate: 0.008409046524903733,
  },
  {
    clicks: 48911,
    impressions: 25479375,
    conversions: 5364,
    _id: {
      subProduct: "Geo-Fencing w/ Foot Traffic",
    },
    ctr: 0.1919631074153114,
    conversionsRate: 0.021052321730811688,
  },
  {
    clicks: 8070,
    impressions: 2805415,
    conversions: 1209,
    _id: {
      subProduct: "Social Display",
    },
    ctr: 0.28765797573621016,
    conversionsRate: 0.04309522833520174,
  },
  {
    clicks: 3860,
    impressions: 2211803,
    conversions: 255,
    _id: {
      subProduct: "Targeted Native",
    },
    ctr: 0.17451825501638257,
    conversionsRate: 0.011529055707040816,
  },
];

export const videoProductPerformance = [
  {
    clicks: 25110,
    impressions: 9204483,
    conversions: 8320,
    _id: {
      subProduct: "Targeted Video",
    },
    videoCompletions: 5958302,
    videoStarts: 8817689,
    video25Pcts: 7550080,
    video50Pcts: 6812572,
    video75Pcts: 6357872,
    ctr: 0.27280185101107796,
    vcr: 64.73260909928347,
    conversionsRate: 0.09039073677467815,
  },
  {
    clicks: 7159,
    impressions: 2546434,
    conversions: 467,
    _id: {
      subProduct: "Addressable Video",
    },
    videoCompletions: 1253294,
    videoStarts: 2482472,
    video25Pcts: 1763514,
    video50Pcts: 1511600,
    video75Pcts: 1366836,
    ctr: 0.28113825058886266,
    vcr: 49.21761176610114,
    conversionsRate: 0.018339371843134358,
  },
  {
    clicks: 3689,
    impressions: 2134964,
    conversions: 252,
    _id: {
      subProduct: "Targeted Native",
    },
    videoCompletions: 0,
    videoStarts: 35,
    video25Pcts: 33,
    video50Pcts: 32,
    video75Pcts: 28,
    ctr: 0.1727897987975441,
    conversionsRate: 0.011803477716720282,
  },
  {
    clicks: 3046,
    impressions: 9131273,
    conversions: 0,
    _id: {
      subProduct: "YouTube True View",
    },
    videoCompletions: 3293225,
    videoStarts: null,
    video25Pcts: 4202590,
    video50Pcts: 3699953,
    video75Pcts: 3450483,
    ctr: 0.03335788996780624,
    vcr: 36.06534379160496,
  },
  {
    clicks: 30,
    impressions: 352910,
    conversions: 0,
    _id: {
      subProduct: "YouTube Bumper",
    },
    videoCompletions: 171766,
    videoStarts: null,
    video25Pcts: 174292,
    video50Pcts: 172971,
    video75Pcts: 172350,
    ctr: 0.008500750899662802,
    vcr: 48.6713326343827,
  },
];
