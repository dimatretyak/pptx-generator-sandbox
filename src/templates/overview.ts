import PowerPointBuilder from "../classes/PowerPointBuilder";
import colors, { palette } from "../data/constants";
import { displayPeriod6Month } from "../data/displayPeriod6Month";
import { displayProduct } from "../data/displayProduct";
import { displayTopKpi } from "../data/displayTopKpi";
import { semTopKpi } from "../data/responses/semTopKpi";
import { socialDisplayProduct } from "../data/responses/socialDisplayProduct";
import { socialDisplayTopKpi } from "../data/responses/socialDisplayTopKpi";
import { socialVideoProduct } from "../data/responses/socialVideoProduct";
import { socialVideoTopKpi } from "../data/responses/socialVideoTopKpi";
import { stvProduct } from "../data/responses/stvProduct";
import { stvTopKpi } from "../data/responses/stvTopKpi";
import { videoProduct } from "../data/videoProduct";
import { videoTopKpi } from "../data/videoTopKpi";
import {
  extractInfoBlockEntity,
  extractTableData,
  preparePercentageValues,
} from "../utils/common";

const builder = new PowerPointBuilder();
const footer = "06/23/2025-06/23/2025";

builder.addMultipleToSlide(
  [
    [
      {
        type: "circles",
        title: "Display - Top KPIs",
        payload: {
          data: extractInfoBlockEntity(
            [
              { text: "Impressions", fieldExtract: (v) => v.impressions },
              { text: "Clicks", fieldExtract: (v) => v.clicks },
              { text: "CTR(%)", fieldExtract: (v) => v.ctr },
            ],
            displayTopKpi.result.data
          ),
        },
      },
    ],
    [
      {
        type: "table",
        title: "Display - Product Performance",
        payload: extractTableData(
          [
            { text: "Product", fieldExtractor: (v) => v._id.subProduct },
            { text: "Impressions", fieldExtractor: (v) => v.impressions },
            { text: "Clicks", fieldExtractor: (v) => v.clicks },
            { text: "CTR(%)", fieldExtractor: (v) => v.ctr },
            { text: "Total Conversions", fieldExtractor: (v) => v.conversions },
          ],
          displayProduct.result.data
        ),
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "Display Ads - Overall Performance",
        footer,
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
        color: colors.chartBar1,
        labels: displayPeriod6Month.result.data.map(
          (v) => v._id.monthYearNumbers
        ),
        values: preparePercentageValues(
          displayPeriod6Month.result.data.map((v) => v.ctr)
        ),
      },
    ],
  },
  {
    markup: {
      text: {
        header: "Display Ads - Overall Performance",
        footer,
      },
    },
  }
);

builder.addMultipleToSlide(
  [
    [
      {
        type: "circles",
        title: "Video - Top KPIs",
        payload: {
          data: extractInfoBlockEntity(
            [
              {
                text: "Impressions",
                fieldExtract: (v) => v.impressions,
              },
              {
                text: "Video Completes",
                fieldExtract: (v) => v.videoCompletions,
              },
              {
                text: "VCR(%)",
                fieldExtract: (v) => v.vcr,
              },
              {
                text: "Clicks",
                fieldExtract: (v) => v.clicks,
              },
              {
                text: "CTR(%)",
                fieldExtract: (v) => v.ctr,
              },
            ],
            videoTopKpi.result.data
          ),
        },
      },
    ],
    [
      {
        type: "table",
        title: "Video - Product Performance",
        payload: extractTableData(
          [
            { text: "Product", fieldExtractor: (v) => v._id.subProduct },
            { text: "Impressions", fieldExtractor: (v) => v.impressions },
            {
              text: "Video Completes",
              fieldExtractor: (v) => v.videoCompletions,
            },
            { text: "VCR(%)", fieldExtractor: (v) => v.vcr },
            { text: "Clicks", fieldExtractor: (v) => v.clicks },
            { text: "CTR(%)", fieldExtractor: (v) => v.ctr },
          ],
          videoProduct.result.data
        ),
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "Video Ads - Overall Performance",
        footer,
      },
    },
  }
);

builder.addBarChartSlide(
  {
    labelFormatCode: "0.00%",
    data: [
      {
        name: "VCR(%)",
        labels: [],
        color: palette.green,
        values: preparePercentageValues([
          41.48591213281817, 40.94513582939654, 41.53409448813366,
          43.50247806410749, 47.44703179457573, 45.89691678434769,
        ]),
      },
      {
        name: "CTR(%)",
        labels: [],
        color: palette.color1,
        values: preparePercentageValues([
          0.15293595212766042, 0.16850330036453867, 0.26369641917544345,
          0.17700485579938047, 0.14604458661489575, 0.18036372656733593,
        ]),
      },
    ],
  },
  {
    markup: {
      text: {
        header: "Video Ads - Overall Performance",
        content: "Video - CTR & VCR Last 6 Months",
        footer,
      },
    },
  }
);

builder.addMultipleToSlide(
  [
    [
      {
        type: "circles",
        title: "STV - Top KPIs",
        payload: {
          data: extractInfoBlockEntity(
            [
              { text: "Impressions", fieldExtract: (v) => v.impressions },
              {
                text: "Video Completes",
                fieldExtract: (v) => v.videoCompletions,
              },
              { text: "VCR(%)", fieldExtract: (v) => v.vcr },
              { text: "Clicks", fieldExtract: (v) => v.clicks },
              {
                text: "Total Conversions",
                fieldExtract: (v) => v.conversions,
              },
            ],
            stvTopKpi.result.data
          ),
        },
      },
    ],
    [
      {
        type: "table",
        title: "STV - Product Performance",
        payload: extractTableData(
          [
            { text: "Product", fieldExtractor: (v) => v._id.subProduct },
            { text: "Impressions", fieldExtractor: (v) => v.impressions },
            {
              text: "Video Completes",
              fieldExtractor: (v) => v.videoCompletions,
            },
            { text: "VCR(%)", fieldExtractor: (v) => v.vcr },
            { text: "Total Conversions", fieldExtractor: (v) => v.conversions },
          ],
          stvProduct.result.data
        ),
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "STV Ads - Overall Performance",
        footer,
      },
    },
  }
);

builder.addBarChartSlide(
  {
    labelFormatCode: "0.00",
    data: [
      {
        name: "STV - VCR Last 6 Months",
        labels: [
          "2024-12",
          "2025-01",
          "2025-02",
          "2025-03",
          "2025-04",
          "2025-05",
        ],
        color: palette.color1,
        values: [
          98.11082691970768, 96.20710360906924, 97.76384959910853,
          98.42112185084699, 98.19255574031881, 98.37915950001471,
        ],
      },
    ],
  },
  {
    markup: {
      text: {
        header: "STV Ads - Overall Performance",
        content: "STV - VCR Last 6 Months",
        footer,
      },
    },
  }
);

builder.addMultipleToSlide(
  [
    [
      {
        type: "circles",
        title: "Key Performance Indicators (Display)",
        payload: {
          data: extractInfoBlockEntity(
            [
              { text: "Impressions", fieldExtract: (v) => v.impressions },
              { text: "Clicks", fieldExtract: (v) => v.clicks },
              { text: "CTR(%)", fieldExtract: (v) => v.ctr },
              { text: "Engagement", fieldExtract: (v) => v.pageengagements },
              {
                text: "Total Conversions/Leads",
                fieldExtract: (v) => v.conversions,
              },
            ],
            socialDisplayTopKpi.result.data
          ),
        },
      },
    ],
    [
      {
        type: "table",
        title: "Product Performance (Display)",
        payload: extractTableData(
          [
            { text: "Product", fieldExtractor: (v) => v._id.subProduct },
            { text: "Impressions", fieldExtractor: (v) => v.impressions },
            { text: "Clicks", fieldExtractor: (v) => v.clicks },
            { text: "CTR(%)", fieldExtractor: (v) => v.ctr },
            { text: "Engagement", fieldExtractor: (v) => v.pageengagements },
            { text: "Conversions/Leads", fieldExtractor: (v) => v.conversions },
          ],
          socialDisplayProduct.result.data
        ),
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "Social Ads - Overall Performance",
        footer,
      },
    },
  }
);

builder.addMultipleToSlide(
  [
    [
      {
        type: "circles",
        title: "Key Performance Indicators (Video)",
        payload: {
          data: extractInfoBlockEntity(
            [
              {
                text: "Video Start(s)",
                fieldExtract: (v) => v.videoStarts,
              },
              {
                text: "Video Complete(s)",
                fieldExtract: (v) => v.videoCompletions,
              },
              {
                text: "VCR(%)",
                fieldExtract: (v) => v.vcr,
              },
            ],
            socialVideoTopKpi.result.data
          ),
        },
      },
    ],
    [
      {
        type: "table",
        title: "Product Performance (Video)",
        payload: extractTableData(
          [
            { text: "Product", fieldExtractor: (v) => v._id.subProduct },
            { text: "Video Start(s)", fieldExtractor: (v) => v.videoStarts },
            {
              text: "Video Complete(s)",
              fieldExtractor: (v) => v.videoCompletions,
            },
            { text: "VCR(%)", fieldExtractor: (v) => v.vcr },
          ],
          socialVideoProduct.result.data
        ),
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "Social Ads - Overall Performance",
        footer,
      },
    },
  }
);

builder.addBarChartSlide(
  {
    labelFormatCode: "0.00%",
    data: [
      {
        name: "VCR(%)",
        color: palette.color1,
        labels: [
          "2024-12",
          "2025-01",
          "2025-02",
          "2025-03",
          "2025-04",
          "2025-05",
        ],
        values: preparePercentageValues([
          8.866294889650362, 7.708495898713394, 11.743684470634875,
          8.29194127148263, 10.63266858275892, 9.170772034317999,
        ]),
      },
      {
        name: "VCR(%)",
        color: palette.color3,
        labels: [],
        values: preparePercentageValues([
          0.7450343140856002, 0.7981875225279288, 0.6589656700743536,
          0.5626097200782556, 0.9106276903916111, 0.9885322684522666,
        ]),
      },
    ],
  },
  {
    markup: {
      text: {
        header: "Social Ads - Overall Performance",
        content: "Social - CTR & VCR Last 6 Months",
        footer,
      },
    },
  }
);

builder.addMultipleToSlide(
  [
    [
      {
        type: "circles",
        title: "Search Engine Marketing",
        payload: {
          data: extractInfoBlockEntity(
            [
              { text: "Impressions", fieldExtract: (v) => v.impressions },
              { text: "Clicks", fieldExtract: (v) => v.clicks },
              { text: "CTR(%)", fieldExtract: (v) => v.ctr },
              {
                text: "Primary Conversions",
                fieldExtract: (v) => v.conversions,
              },
              {
                text: "Primary Conv. Rate",
                fieldExtract: (v) => v.conversionsRate,
              },
              {
                text: "All Conversions",
                fieldExtract: (v) => v.allConversions,
              },
              {
                text: "All Conv. Rate",
                fieldExtract: (v) => v.allconversionsRate,
              },
            ],
            semTopKpi.result.data,
            {
              perChunk: 8,
            }
          ),
        },
      },
    ],
    [
      {
        type: "bar",
        title: "SEM -CTR Last 6 Months",
        payload: {
          data: [
            {
              name: "SEM - CTR Last 6 Months",
              color: colors.chartBar1,
              labels: [
                "2024-12",
                "2025-01",
                "2025-02",
                "2025-03",
                "2025-04",
                "2025-05",
              ],
              values: [
                6.1911727729106465, 5.66177018744267, 6.653441364119759,
                8.047542372827401, 7.751307703102387, 7.339709814383512,
              ],
            },
          ],
        },
      },
    ],
  ],
  {
    markup: {
      text: {
        header: "SEM Ads - Overall Performance",
        footer,
      },
    },
  }
);

export default () => {
  builder.buildAndSave("output/overview.pptx");
};
