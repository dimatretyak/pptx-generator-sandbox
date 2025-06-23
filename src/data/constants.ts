import { PowerPointBoxEntity } from "../classes/PowerPointInfoBlocks";

export const cards: Array<PowerPointBoxEntity[][]> = [
  [
    [
      { title: "Impressions", value: 177000000 },
      { title: "Clicks", value: 269000 },
      { title: "CTR(%)", value: 0.15261760710334837 },
    ],
    [
      { title: "Impressions", value: 33300000 },
      { title: "Site Conversions", value: 2700 },
    ],
    [
      { title: "Foot Traffic Visits", value: 4400 },
      { title: "Video Start(s)", value: 2600000 },
      { title: "Video Complete(s)", value: 1300000 },
    ],
  ],

  [
    [
      { title: "Impressions", value: 177000000 },
      { title: "Clicks", value: 269000 },
      { title: "CTR(%)", value: 0.15261760710334837 },
    ],
    [
      { title: "VCR(%)", value: 45.68488558696288 },
      { title: "Impressions", value: 23370064 },
      { title: "Site Conversions", value: 2750 },
    ],
    [
      { title: "Foot Traffic Visits", value: 4789 },
      { title: "Video Start(s)", value: 2653123 },
      { title: "Video Complete(s)", value: 1353111 },
    ],
  ],

  [
    [
      { title: "Impressions", value: 177000000 },
      { title: "Clicks", value: 269000 },
      { title: "CTR(%)", value: 0.15261760710334837 },
      { title: "VCR(%)", value: 45.68488558696288 },
    ],
    [
      { title: "Impressions", value: 33300000 },
      { title: "Site Conversions", value: 2700 },
      { title: "Foot Traffic Visits", value: 4400 },
      { title: "Video Start(s)", value: 2600000 },
    ],
  ],

  [
    [
      { title: "Impressions", value: 177000000 },
      { title: "Clicks", value: 269000 },
      { title: "CTR(%)", value: 0.15261760710334837 },
    ],
    [
      { title: "Impressions", value: 33300000 },
      { title: "Total Calls", value: 17731 },
      { title: "Site Conversions", value: 2751 },
    ],
    [
      { title: "Foot Traffic Visits", value: 4512 },
      { title: "Video Start(s)", value: 2561233 },
      { title: "Video Complete(s)", value: 1342111 },
    ],
    [
      { title: "First Calls", value: 12199 },
      { title: "Answered Calls", value: 15731 },
      { title: "Answered (%)", value: 88.67712 },
    ],
  ],

  [
    [{ title: "Impressions", value: 177333222 }],
    [
      { title: "Impressions", value: 33300000 },
      { title: "Total Calls", value: 17650 },
      { title: "Site Conversions", value: 2650 },
    ],
    [
      { title: "Foot Traffic Visits", value: 4300 },
      { title: "Video Start(s)", value: 2650000 },
      { title: "Video Complete(s)", value: 1250000 },
    ],
    [
      { title: "First Calls", value: 12199 },
      { title: "Answered Calls", value: 15699 },
      { title: "Answered (%)", value: 88.12323 },
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

// TODO: Reuse from lumina in the future
const palette = {
  green: "#0392a3",
  red: "#d72d8d",
  color1: "#0062a8",
  color2: "#3054ba",
  color3: "#5465d5",
  color4: "#6d4dd3",
  color5: "#a146db",
};

// TODO: Reuse from lumina in the future
const colors = {
  tableHighlight1: palette.color2,
  tableHighlight2: palette.color1,
  tableHighlight3: palette.color5,
  tableHighlight4: palette.color4,
  chartBar1: palette.color1,
  chartBar2: palette.color3,
  chartLine1: palette.color5,
  chartLine2: palette.green,
  arrowUp: palette.green,
  arrowDown: palette.red,
  tableCellUp: palette.green,
  tableCellDown: palette.red,
  chartPie1: palette.green,
  chartPie2: palette.color2,
  chartPie3: palette.color4,
  chartPie4: palette.red,
};

export default colors;
