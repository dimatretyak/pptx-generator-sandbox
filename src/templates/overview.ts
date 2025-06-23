import PowerPointBuilder from "../classes/PowerPointBuilder";
import colors, { palette } from "../data/constants";
import { preparePercentageValues } from "../utils/common";

const builder = new PowerPointBuilder();
const footer = "06/23/2025-06/23/2025";

builder.addMultipleToSlide(
  [
    [
      {
        type: "circles",
        title: "Display - Top KPIs",
        payload: {
          data: [
            [
              { title: "Impressions", value: 168209120 },
              { title: "Clicks", value: 263517 },
              { title: "CTR(%)", value: 0.15666035230432215 },
            ],
          ],
        },
      },
    ],
    [
      {
        type: "table",
        title: "Display - Product Performance",
        payload: {
          headers: [
            { text: "Product" },
            { text: "Impressions" },
            { text: "Clicks" },
            { text: "CTR(%)" },
            { text: "Total Conversions" },
          ],
          data: [
            [
              { value: "Targeted Display" },
              { value: 108736375 },
              { value: 144135 },
              { value: 0.13255453844217266 },
              { value: 96752 },
            ],
            [
              { value: "Addressable Display" },
              { value: 32187470 },
              { value: 67405 },
              { value: 0.20941378741479214 },
              { value: 3121 },
            ],
            [
              { value: "Geo-Fencing w/ Foot Traffic" },
              { value: 22928000 },
              { value: 41551 },
              { value: 0.1812238311235171 },
              { value: 5101 },
            ],
            [
              { value: "Social Display" },
              { value: 2365567 },
              { value: 7269 },
              { value: 0.30728362375701046 },
              { value: 573 },
            ],
            [
              { value: "Targeted Native" },
              { value: 1991708 },
              { value: 3157 },
              { value: 0.15850717072984594 },
              { value: 227 },
            ],
          ],
        },
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
        labels: [
          "2024-12",
          "2025-01",
          "2025-02",
          "2025-03",
          "2025-04",
          "2025-05",
        ],
        values: preparePercentageValues([
          0.10255475655375332, 0.12592758378737542, 0.12647139566235044,
          0.12473442597853315, 0.15245978647888853, 0.15257094896145726,
        ]),
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
          data: [
            [
              { title: "Impressions", value: 23683618 },
              { title: "Video Completes", value: 10658642 },
              { title: "VCR(%)", value: 45.00428101821267 },
              { title: "Clicks", value: 38831 },
              { title: "CTR(%)", value: 0.16395721295622992 },
            ],
          ],
        },
      },
    ],
    [
      {
        type: "table",
        title: "Video - Product Performance",
        payload: {
          headers: [
            { text: "Product" },
            { text: "Impressions" },
            { text: "Video Completes" },
            { text: "VCR(%)" },
            { text: "Clicks" },
            { text: "CTR(%)" },
          ],
          data: [
            [
              { value: "Targeted Video" },
              { value: 8818920 },
              { value: 5508731 },
              { value: 62.46491633896214 },
              { value: 25852 },
              { value: 0.29314247096016294 },
            ],
            [
              { value: "Addressable Video" },
              { value: 3015579 },
              { value: 1569324 },
              { value: 52.040553406161806 },
              { value: 6900 },
              { value: 0.22881178042425684 },
            ],
            [
              { value: "Targeted Native" },
              { value: 1992221 },
              { value: 0 },
              { value: "-" },
              { value: 3157 },
              { value: 0.1584663548873343 },
            ],
            [
              { value: "YouTube True View" },
              { value: 9489484 },
              { value: 3402072 },
              { value: 35.85096934669999 },
              { value: 2856 },
              { value: 0.03009647310644077 },
            ],
            [
              { value: "YouTube Bumper" },
              { value: 367414 },
              { value: 178515 },
              { value: 48.58688019509327 },
              { value: 66 },
              { value: 0.017963387350509234 },
            ],
          ],
        },
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
          data: [
            [
              { title: "Impressions", value: 28885490 },
              { title: "Video Completes", value: 28461592 },
              { title: "VCR(%)", value: 98.44440937938042 },
              { title: "Clicks", value: 131 },
              { title: "Total Conversions", value: 2006 },
            ],
          ],
        },
      },
    ],
    [
      {
        type: "table",
        title: "STV - Product Performance",
        payload: {
          headers: [
            { text: "Product" },
            { text: "Impressions" },
            { text: "Video Completes" },
            { text: "VCR(%)" },
            { text: "Total Conversions" },
          ],
          data: [
            [
              { value: "Addressable STV" },
              { value: 7351054 },
              { value: 7260689 },
              { value: 98.44945967765337 },
              { value: 2005 },
            ],
            [
              { value: "Targeted STV" },
              { value: 19813540 },
              { value: 19501264 },
              { value: 98.50841656923384 },
              { value: 1 },
            ],
            [
              { value: "STV" },
              { value: 1332716 },
              { value: 1315261 },
              { value: 97.30435348724346 },
              { value: 0 },
            ],
            [
              { value: "Hulu" },
              { value: 388180 },
              { value: 384378 },
              { value: 99.05424071248918 },
              { value: "-" },
            ],
          ],
        },
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
          data: [
            [
              { title: "Impressions", value: 408136770 },
              { title: "Clicks", value: 5482618 },
              { title: "CTR(%)", value: 1.3433286101617359 },
              { title: "Engagement", value: 8213120 },
              { title: "Total Conversions/Leads", value: 774137 },
            ],
          ],
        },
      },
    ],
    [
      {
        type: "table",
        title: "Product Performance (Display)",
        payload: {
          headers: [
            { text: "Product" },
            { text: "Impressions" },
            { text: "Clicks" },
            { text: "CTR(%)" },
            { text: "Engagement" },
            { text: "Conversions/Leads" },
          ],
          data: [
            [
              { value: "Link Clicks" },
              { value: 195226162 },
              { value: 2841688 },
              { value: 1.4555876993576302 },
              { value: "-" },
              { value: 306714 },
            ],
            [
              { value: "Unknown" },
              { value: 45349928 },
              { value: 834437 },
              { value: 1.8399963060580824 },
              { value: "-" },
              { value: 0 },
            ],
            [
              { value: "Conversions" },
              { value: 41672164 },
              { value: 716307 },
              { value: 1.7189100138884077 },
              { value: "-" },
              { value: 291849 },
            ],
            [
              { value: "Link Clicks" },
              { value: 52892686 },
              { value: 665715 },
              { value: 1.258614470817383 },
              { value: 4385560 },
              { value: 49738 },
            ],
            [
              { value: "Sponsored Social Mentions" },
              { value: 24315475 },
              { value: 163447 },
              { value: 0.6721933254439817 },
              { value: 1306055 },
              { value: 3 },
            ],
          ],
        },
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
          data: [
            [
              { title: "Video Start(s)", value: 32535270 },
              { title: "Video Complete(s)", value: 2473143 },
              { title: "VCR(%)", value: 7.60142147275864 },
            ],
          ],
        },
      },
    ],
    [
      {
        type: "table",
        title: "Product Performance (Video)",
        payload: {
          headers: [
            { text: "Product" },
            { text: "Video Start(s)" },
            { text: "Video Complete(s)" },
            { text: "VCR(%)" },
          ],
          data: [
            [
              { value: "Link Clicks" },
              { value: 10703604 },
              { value: 1227691 },
              { value: 11.469884349234146 },
            ],
            [
              { value: "Conversions" },
              { value: 7054509 },
              { value: 716844 },
              { value: 10.16150096342637 },
            ],
            [
              { value: "Sponsored Social Mentions" },
              { value: 4727701 },
              { value: 234306 },
              { value: 4.956024080203041 },
            ],
            [
              { value: "Awareness" },
              { value: 2670619 },
              { value: 79873 },
              { value: 2.9908047535047118 },
            ],
            [
              { value: "Link Clicks" },
              { value: 2366616 },
              { value: 49685 },
              { value: 2.099411142323047 },
            ],
          ],
        },
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
          data: [
            [
              { title: "Impressions", value: 6120953 },
              { title: "Clicks", value: 544928 },
              { title: "CTR(%)", value: 8.902665973746245 },
              { title: "Primary Conversions", value: 87946 },
              { title: "Primary Conv. Rate", value: 13.471150208241747 },
              { title: "All Conversions", value: 125882.73684983421 },
              { title: "All Conv. Rate", value: 19.282159525891977 },
            ],
          ],
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
