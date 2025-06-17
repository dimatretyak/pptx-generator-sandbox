import pptxgen from "pptxgenjs";
import { PowerPointConfig, PowerPointValue } from "./types/common";
import {
  displayProductPerformance,
  videoProductPerformance,
} from "./data/constants";
import { getMinMax, isNumber, isString } from "./utils/common";
import {
  formatNumber,
  formatNumberWithSuffix,
  formatPercent,
} from "./utils/formatters";
import splitArrayIntoChunks from "./utils/splitArrayIntoChunks";
import {
  PowerPointTable,
  PowerPointTableCell,
  PowerPointTablePayload,
} from "./classes/PowerPointTable";
import {
  PowerPointBarChart,
  PowerPointBarChartOptions,
  PowerPointBarChartPayload,
} from "./classes/PowerPointBarChart";
import { PowerPointLayout } from "./classes/PowerPointLayout";
import {
  PowerPointBoxes,
  PowerPointBoxesPayload,
} from "./classes/PowerPointBoxes";
import {
  PowerPointPieChart,
  PowerPointPieChartPayload,
} from "./classes/PowerPointPieChart";

// 16:9 aspect ratio
const LAYOUT_NAME = "APP";
const SLIDE_WIDTH = 10;
const SLIDE_HEIGHT = 5.625;
const FALLBACK_POWER_POINT_VALUE = "-";

class PresentationBuilder {
  private slideGenerators: Array<(slide: pptxgen.Slide) => void> = [];
  private presentation: pptxgen;
  private config: PowerPointConfig;
  private table: PowerPointTable;
  private boxes: PowerPointBoxes;
  private layout: PowerPointLayout;

  private charts: {
    pie: PowerPointPieChart;
    bar: PowerPointBarChart;
  };

  static formatNumber(value: PowerPointValue): string {
    if (isNumber(value)) {
      return formatNumber(value);
    }

    if (isString(value)) {
      return value;
    }

    return FALLBACK_POWER_POINT_VALUE;
  }

  static formatPercent(value: PowerPointValue): string {
    if (isNumber(value)) {
      return formatPercent(value);
    }

    if (isString(value)) {
      return value;
    }

    return FALLBACK_POWER_POINT_VALUE;
  }

  constructor() {
    this.presentation = new pptxgen();

    this.config = {
      border: {
        size: 1,
        color: "cccccc",
      },
      roundess: 0.025,
      margin: {
        top: 0.25,
        left: 0.25,
        right: 0.25,
        bottom: 0.25,
      },
      slide: {
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
      },
      spacer: 0.25,
    };

    this.layout = new PowerPointLayout(this.config);

    this.presentation.defineLayout({
      name: LAYOUT_NAME,
      width: this.config.slide.width,
      height: this.config.slide.height,
    });

    this.presentation.layout = LAYOUT_NAME;

    this.table = new PowerPointTable(this.config);
    this.boxes = new PowerPointBoxes(this.config, this.layout);

    this.charts = {
      bar: new PowerPointBarChart(this.config, this.layout),
      pie: new PowerPointPieChart(this.config, this.layout),
    };
  }

  addSlideTitle(slide: pptxgen.Slide, title: string) {
    this.layout.renderContentTitle(slide, title);
  }

  addBoxesSlide(payload: PowerPointBoxesPayload) {
    this.slideGenerators.push((slide) => {
      this.addSlideTitle(slide, payload.title);

      this.boxes.render(slide, payload);
    });

    return this;
  }

  addTableSlide(payload: PowerPointTablePayload) {
    const { width, height } = this.layout.getSlideSizes();

    this.slideGenerators.push((slide) => {
      this.addSlideTitle(slide, payload.title);
      this.table.render(slide, payload, {
        width,
        height,
      });
    });

    return this;
  }

  addBarChartSlide(
    payload: PowerPointBarChartPayload,
    options: PowerPointBarChartOptions = {}
  ) {
    const { width, height } = this.layout.getSlideSizes();

    this.slideGenerators.push((slide) => {
      this.layout.renderSlideMarkup(slide, {
        title: payload.title,
      });

      this.charts.bar.render(slide, payload, options, {
        width,
        height,
      });
    });

    return this;
  }

  addPieChartSlide(payload: PowerPointPieChartPayload) {
    const { width, height } = this.layout.getSlideSizes();

    this.slideGenerators.push((slide) => {
      this.layout.renderSlideMarkup(slide, {
        title: payload.title,
      });

      this.charts.pie.render(slide, payload, {
        width,
        height,
      });
    });

    return this;
  }

  buildAndSave(fileName: string) {
    for (const generateSlide of this.slideGenerators) {
      const slide = this.presentation.addSlide();
      generateSlide(slide);
    }

    this.presentation.writeFile({ fileName });
  }
}

const builder = new PresentationBuilder();

// Render charts
builder.addPieChartSlide({
  title: "Impressions by Device",
  data: {
    name: "Project Status",
    labels: ["mobile_app", "mobile_web", "desktop", "Smartphone", "Desktop"],
    values: [2265852, 12640, 33414, 40621, 1953],
    colors: ["0088FE", "00C49F", "FFBB28", "FF8042"],
  },
});

builder.addBarChartSlide({
  title: "Display - CTR Last 6 Months",
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
});

builder.addBarChartSlide({
  title: "Video - CTR & VCR Last 6 Months",
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
});

builder.addBarChartSlide(
  {
    title: "Weekly Performance Trend(s)",
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
    normalizeData: true,
  }
);

builder.addBarChartSlide(
  {
    title: "Campaign Performance",
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
    normalizeData: true,
  }
);

const clicks = getMinMax(displayProductPerformance, "clicks");
const totalConversions = getMinMax(displayProductPerformance, "conversions");

builder.addTableSlide({
  title: "Display - Product Performance",
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
      { value: entity.impressions, format: PresentationBuilder.formatNumber },
      { value: entity.clicks, format: PresentationBuilder.formatNumber },
      { value: entity.ctr, format: PresentationBuilder.formatPercent },
      { value: entity.conversions, format: PresentationBuilder.formatNumber },
    ];

    return result;
  }),
});

const videoComletes = getMinMax(videoProductPerformance, "videoCompletions");
const videoClicks = getMinMax(videoProductPerformance, "clicks");
const entities = videoProductPerformance.map((entity) => {
  const result: PowerPointTableCell[] = [
    { value: entity._id.subProduct },
    { value: entity.impressions, format: PresentationBuilder.formatNumber },
    {
      value: entity.videoCompletions,
      format: PresentationBuilder.formatNumber,
    },
    { value: entity.vcr, format: PresentationBuilder.formatPercent },
    { value: entity.clicks, format: PresentationBuilder.formatNumber },
    { value: entity.ctr, format: PresentationBuilder.formatPercent },
  ];

  return result;
});

builder.addTableSlide({
  title: "Video - Product Performance",
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
});

builder.addBoxesSlide({
  title: "Display - Top KPIs",
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
        format: PresentationBuilder.formatPercent,
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
});

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
    format: PresentationBuilder.formatPercent,
  },
  {
    title: "Clicks",
    value: 42000,
    format: formatNumberWithSuffix,
  },
  {
    title: "CTR(%)",
    value: 0.17,
    format: PresentationBuilder.formatPercent,
  },
];

builder.addBoxesSlide({
  title: "Video - Top KPIs",
  data: splitArrayIntoChunks(videoTopKPIData, 3),
});

// Add slides with cards
// for (const data of cards) {
//   builder.addBoxesSlide(data);
// }

builder.buildAndSave("output/demo.pptx");
