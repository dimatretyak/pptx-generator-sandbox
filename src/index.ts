import {
  displayProductPerformance,
  videoProductPerformance,
} from "./data/constants";
import { getMinMax } from "./utils/common";
import { formatNumberWithSuffix } from "./utils/formatters";
import splitArrayIntoChunks from "./utils/splitArrayIntoChunks";
import { PowerPointTableCell } from "./classes/PowerPointTable";
import PowerPointBuilder from "./classes/PowerPointBuilder";

const builder = new PowerPointBuilder();

// Render charts
builder.addPieChartSlide(
  {
    data: {
      name: "Project Status",
      labels: ["mobile_app", "mobile_web", "desktop", "Smartphone", "Desktop"],
      values: [2265852, 12640, 33414, 40621, 1953],
      colors: ["0088FE", "00C49F", "FFBB28", "FF8042"],
    },
  },
  {
    markup: {
      text: {
        header: "Device Performance",
        content: "Impressions by Device",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

builder.addBarChartSlide(
  {
    labelFormatCode: "0.00%",
    data: [
      {
        name: "Display - CTR Last 6 Months",
        color: "cdd8f2",
        labels: [
          "2024-12",
          "2025-01",
          "2025-02",
          "2025-03",
          "2025-04",
          "2025-05",
        ],
        values: [0.00093, 0.00127, 0.00127, 0.00115, 0.00145, 0.00145],
      },
    ],
  },
  {
    markup: {
      text: {
        header: "Display Ads - Overall Performance",
        content: "Display - CTR Last 6 Months",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

builder.addBarChartSlide(
  {
    labelFormatCode: "00.00%",
    data: [
      {
        name: "VCR(%)",
        color: "0f5870",
        labels: [],
        values: [
          0.4148591213281817, 0.4094513582939654, 0.4153409448813366,
          0.4350247806410749, 0.4744703179457573, 0.45896916784347686,
        ],
      },
      {
        name: "CTR(%)",
        color: "cdd8f2",
        labels: [],
        values: [
          0.0015293595212766042, 0.0016850330036453868, 0.0026369641917544347,
          0.0017700485579938046, 0.0014604458661489576, 0.0018036372656733593,
        ],
      },
    ],
  },
  {
    markup: {
      text: {
        header: "Video Ads - Overall Performance",
        content: "Video - CTR & VCR Last 6 Months",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

builder.addBarChartSlide(
  {
    normalizeData: true,
    labelFormatCode: "0",
    data: [
      {
        name: "Impressions",
        color: "0f5870",
        labels: [
          "05/18/2025",
          "05/25/2025",
          "06/01/2025",
          "06/08/2025",
          "06/15/2025",
        ],
        values: [3639961, 7259256, 8872578, 6760069, 5891814],
      },
    ],
    lines: [
      {
        name: "Clicks",
        color: "cdd8f2",
        values: [7055, 13882, 17499, 13568, 12257],
      },
      {
        name: "Foot Traffic Visits",
        color: "e6821e",
        values: [597, 949, 805, 781, 840],
      },
    ],
  },
  {
    markup: {
      text: {
        header: "Addressable Display Overview",
        content: "Weekly Performance Trend(s)",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

builder.addBarChartSlide(
  {
    normalizeData: true,
    labelFormatCode: "0",
    data: [
      {
        name: "Impressions",
        color: "0f5870",
        labels: [
          "05/18/2025",
          "05/25/2025",
          "06/01/2025",
          "06/08/2025",
          "06/15/2025",
        ],
        values: [843548, 398067, 344513, 358257, 332990],
      },
      {
        name: "Clicks",
        labels: [],
        color: "d09cc8",
        values: [1364, 737, 598, 597, 537],
      },
    ],
    lines: [
      {
        name: "Foot Traffic Visits",
        color: "0f5870",
        values: [0, 0, 0, 16, 0],
      },
    ],
  },
  {
    markup: {
      text: {
        header: "Campaign Performance",
        content: "Campaign Performance",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

const clicks = getMinMax(displayProductPerformance, "clicks");
const totalConversions = getMinMax(displayProductPerformance, "conversions");

builder.addTableSlide(
  {
    headers: [
      { text: "Product" },
      { text: "Impressions" },
      {
        text: "Clicks",
        heatMap: {
          colorPalette: ["#e3f2fd", "#0d47a1"],
          maxValue: clicks.max,
          minValue: clicks.min,
        },
      },
      { text: "CTR(%)" },
      {
        text: "Total Conversions",
        heatMap: {
          colorPalette: ["#fadcb4", "#f29111"],
          maxValue: totalConversions.max,
          minValue: totalConversions.min,
        },
      },
    ],
    data: displayProductPerformance.map((entity) => {
      const result: PowerPointTableCell[] = [
        { value: entity._id.subProduct },
        { value: entity.impressions, format: PowerPointBuilder.formatNumber },
        { value: entity.clicks, format: PowerPointBuilder.formatNumber },
        { value: entity.ctr, format: PowerPointBuilder.formatPercent },
        { value: entity.conversions, format: PowerPointBuilder.formatNumber },
      ];

      return result;
    }),
  },
  {
    markup: {
      text: {
        header: "Display Ads - Overall Performance",
        content: "Display - Product Performance",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

const videoComletes = getMinMax(videoProductPerformance, "videoCompletions");
const videoClicks = getMinMax(videoProductPerformance, "clicks");
const entities = videoProductPerformance.map((entity) => {
  const result: PowerPointTableCell[] = [
    { value: entity._id.subProduct },
    { value: entity.impressions, format: PowerPointBuilder.formatNumber },
    {
      value: entity.videoCompletions,
      format: PowerPointBuilder.formatNumber,
    },
    { value: entity.vcr, format: PowerPointBuilder.formatPercent },
    { value: entity.clicks, format: PowerPointBuilder.formatNumber },
    { value: entity.ctr, format: PowerPointBuilder.formatPercent },
  ];

  return result;
});

builder.addTableSlide(
  {
    headers: [
      { text: "Product" },
      { text: "Impressions" },
      {
        text: "Video Completes",
        heatMap: {
          colorPalette: ["#a2f5aa", "#0e9c1c"],
          maxValue: videoComletes.max,
          minValue: videoComletes.min,
        },
      },
      { text: "VCR(%)" },
      {
        text: "Clicks",
        heatMap: {
          colorPalette: ["#e3f2fd", "#0d47a1"],
          maxValue: videoClicks.max,
          minValue: videoClicks.min,
        },
      },
      {
        text: "CTR(%)",
      },
    ],
    data: [
      ...entities,
      ...entities,
      ...entities,
      ...entities,
      ...entities,
      ...entities,
    ],
  },
  {
    markup: {
      text: {
        header: "Video Ads - Overall Performance",
        content: "Video - Product Performance",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

builder.addBoxesSlide(
  {
    data: [
      [
        {
          title: "Impressions",
          value: 177000000,
          format: formatNumberWithSuffix,
        },
        {
          title: "Clicks",
          value: 269000,
          format: formatNumberWithSuffix,
        },
        {
          title: "CTR(%)",
          value: 0.15261760710334837,
          format: PowerPointBuilder.formatPercent,
        },
      ],
      [
        {
          title: "Impressions",
          value: 33300000,
          format: formatNumberWithSuffix,
        },
        {
          title: "Site Conversions",
          value: 2700,
          format: formatNumberWithSuffix,
        },
      ],
      [
        {
          title: "Foot Traffic Visits",
          value: 4400,
          format: formatNumberWithSuffix,
        },
        {
          title: "Video Start(s)",
          value: 2600000,
          format: formatNumberWithSuffix,
        },
        {
          title: "Video Complete(s)",
          value: 1300000,
          format: formatNumberWithSuffix,
        },
      ],
    ],
  },
  {
    markup: {
      text: {
        header: "Display Ads - Overall Performance",
        content: "Display - Top KPIs",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

const videoTopKPIData = [
  {
    title: "Impressions",
    value: 24150000,
    format: formatNumberWithSuffix,
  },
  {
    title: "Video Completes",
    value: 10500000,
    format: formatNumberWithSuffix,
  },
  {
    title: "VCR(%)",
    value: 45.0,
    format: PowerPointBuilder.formatPercent,
  },
  {
    title: "Clicks",
    value: 42000,
    format: formatNumberWithSuffix,
  },
  {
    title: "CTR(%)",
    value: 0.17,
    format: PowerPointBuilder.formatPercent,
  },
];

builder.addBoxesSlide(
  {
    data: splitArrayIntoChunks(videoTopKPIData, 3),
  },
  {
    markup: {
      text: {
        header: "Video Ads - Overall Performance",
        content: "Video - Top KPIs",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

builder.addMultipleToSlide(
  [
    [
      {
        type: "pie",
        title: "Pie",
        payload: {
          data: {
            name: "Project Status",
            labels: [
              "mobile_app",
              "mobile_web",
              "desktop",
              "Smartphone",
              "Desktop",
            ],
            values: [2265852, 12640, 33414, 40621, 1953],
            colors: ["0088FE", "00C49F", "FFBB28", "FF8042"],
          },
        },
      },
      {
        type: "bar",
        title: "Bar",
        payload: {
          labelFormatCode: "0.00%",
          data: [
            {
              name: "Display - CTR Last 6 Months",
              color: "cdd8f2",
              labels: [
                "2024-12",
                "2025-01",
                "2025-02",
                "2025-03",
                "2025-04",
                "2025-05",
              ],
              values: [0.00093, 0.00127, 0.00127, 0.00115, 0.00145, 0.00145],
            },
          ],
        },
      },
    ],
    [
      {
        type: "boxes",
        title: "Boxes",
        payload: {
          data: [
            [
              {
                title: "Impressions",
                value: 177000000,
                format: formatNumberWithSuffix,
              },
              {
                title: "Clicks",
                value: 269000,
                format: formatNumberWithSuffix,
              },
              {
                title: "CTR(%)",
                value: 0.15261760710334837,
                format: PowerPointBuilder.formatPercent,
              },
            ],
            [
              {
                title: "Impressions",
                value: 33300000,
                format: formatNumberWithSuffix,
              },
              {
                title: "Site Conversions",
                value: 2700,
                format: formatNumberWithSuffix,
              },
            ],
          ],
        },
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "Multiple Charts",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

builder.addMultipleToSlide(
  [
    [
      {
        type: "pie",
        title: "Pie",
        payload: {
          data: {
            name: "Project Status",
            labels: [
              "mobile_app",
              "mobile_web",
              "desktop",
              "Smartphone",
              "Desktop",
            ],
            values: [2265852, 12640, 33414, 40621, 1953],
            colors: ["0088FE", "00C49F", "FFBB28", "FF8042"],
          },
        },
      },
      {
        type: "bar",
        title: "Bar",
        payload: {
          labelFormatCode: "0.00%",
          data: [
            {
              name: "Display - CTR Last 6 Months",
              color: "cdd8f2",
              labels: [
                "2024-12",
                "2025-01",
                "2025-02",
                "2025-03",
                "2025-04",
                "2025-05",
              ],
              values: [0.00093, 0.00127, 0.00127, 0.00115, 0.00145, 0.00145],
            },
          ],
        },
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "Multiple Charts - 2 cols",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

builder.addMultipleToSlide(
  [
    [
      {
        type: "pie",
        title: "Pie",
        payload: {
          data: {
            name: "Project Status",
            labels: [
              "mobile_app",
              "mobile_web",
              "desktop",
              "Smartphone",
              "Desktop",
            ],
            values: [2265852, 12640, 33414, 40621, 1953],
            colors: ["0088FE", "00C49F", "FFBB28", "FF8042"],
          },
        },
      },
    ],
    [
      {
        type: "bar",
        title: "Bar",
        payload: {
          labelFormatCode: "0.00%",
          data: [
            {
              name: "Display - CTR Last 6 Months",
              color: "cdd8f2",
              labels: [
                "2024-12",
                "2025-01",
                "2025-02",
                "2025-03",
                "2025-04",
                "2025-05",
              ],
              values: [0.00093, 0.00127, 0.00127, 0.00115, 0.00145, 0.00145],
            },
          ],
        },
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "Multiple Charts - 2 rows",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

builder.addMultipleToSlide(
  [
    [
      {
        type: "pie",
        title: "Pie",
        payload: {
          data: {
            name: "Project Status",
            labels: [
              "mobile_app",
              "mobile_web",
              "desktop",
              "Smartphone",
              "Desktop",
            ],
            values: [2265852, 12640, 33414, 40621, 1953],
            colors: ["0088FE", "00C49F", "FFBB28", "FF8042"],
          },
        },
      },
      {
        type: "table",
        title: "Table",
        payload: {
          headers: [
            { text: "Product" },
            { text: "Impressions" },
            {
              text: "Clicks",
              heatMap: {
                colorPalette: ["#e3f2fd", "#0d47a1"],
                maxValue: clicks.max,
                minValue: clicks.min,
              },
            },
            { text: "CTR(%)" },
            {
              text: "Total Conversions",
              heatMap: {
                colorPalette: ["#fadcb4", "#f29111"],
                maxValue: totalConversions.max,
                minValue: totalConversions.min,
              },
            },
          ],
          data: displayProductPerformance.slice(0, 3).map((entity) => {
            const result: PowerPointTableCell[] = [
              { value: entity._id.subProduct },
              {
                value: entity.impressions,
                format: PowerPointBuilder.formatNumber,
              },
              { value: entity.clicks, format: PowerPointBuilder.formatNumber },
              { value: entity.ctr, format: PowerPointBuilder.formatPercent },
              {
                value: entity.conversions,
                format: PowerPointBuilder.formatNumber,
              },
            ];

            return result;
          }),
        },
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "Multiple Charts - 2 rows with table",
        footer: "05/12 - 06/01 2025",
      },
    },
  }
);

// Add slides with cards
// for (const data of cards) {
//   builder.addBoxesSlide(data);
// }

builder.buildAndSave("output/demo.pptx");
