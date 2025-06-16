import pptxgen from "pptxgenjs";
import {
  Card,
  Formatter,
  PowerPointChartDataEntity,
  PowerPointPieChartData,
  PowerPointTableCellEntity,
  PowerPointValue,
  TableHeaderEntity,
} from "./types/common";
import {
  cards,
  displayProductPerformance,
  videoProductPerformance,
} from "./data/constants";
import {
  generateHeatmapColor,
  getMinMax,
  getTextColorByBackground,
  isNumber,
  isString,
  stripHexHash,
} from "./utils/common";
import {
  formatNumber,
  formatNumberWithSuffix,
  formatPercent,
} from "./utils/formatters";
import splitArrayIntoChunks from "./utils/splitArrayIntoChunks";
import { normalizeBarsChartData } from "./utils/charts";

// 16:9 aspect ratio
const LAYOUT_NAME = "APP";
const SLIDE_WIDTH = 10;
const SLIDE_HEIGHT = 5.625;
const FALLBACK_POWER_POINT_VALUE = "-";

const formatPowerPointNumber = (value: PowerPointValue) => {
  if (isNumber(value)) {
    return formatNumber(value);
  }

  if (isString(value)) {
    return value;
  }

  return FALLBACK_POWER_POINT_VALUE;
};

const formatPowerPointPercent = (value: PowerPointValue) => {
  if (isNumber(value)) {
    return formatPercent(value);
  }

  if (isString(value)) {
    return value;
  }

  return FALLBACK_POWER_POINT_VALUE;
};

class PresentationBuilder {
  private slideGenerators: Array<(slide: pptxgen.Slide) => void> = [];
  private presentation: pptxgen;
  private config: {
    borderSize: number;
    roundess: number;
    margin: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    };
  };

  constructor() {
    this.presentation = new pptxgen();

    this.presentation.defineLayout({
      name: LAYOUT_NAME,
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
    });

    this.presentation.layout = LAYOUT_NAME;

    this.config = {
      borderSize: 1,
      roundess: 0.025,
      margin: {
        top: 0.75,
        left: 0.25,
        right: 0.25,
        bottom: 0.25,
      },
    };
  }

  private getSizes() {
    return {
      width: SLIDE_WIDTH - this.config.margin.left - this.config.margin.right,
      height: SLIDE_HEIGHT - this.config.margin.top - this.config.margin.bottom,
    };
  }

  private formatValue(value: PowerPointValue, formatter?: Formatter) {
    if (typeof formatter === "function") {
      return formatter(value);
    }

    if (isNumber(value)) {
      return value.toString();
    }

    if (isString(value)) {
      return value;
    }

    return FALLBACK_POWER_POINT_VALUE;
  }

  addSlideTitle(slide: pptxgen.Slide, title: string) {
    const sizes = this.getSizes();

    slide.addText(title, {
      x: this.config.margin.left,
      y: 0,
      h: this.config.margin.top,
      valign: "middle",
      bold: true,
      fontSize: 18,
      margin: 0,
      w: sizes.width,
    });
  }

  addCardsSlide(cards: Card[][]) {
    const SPACER_SIZE = 0.25;
    const { width, height } = this.getSizes();

    this.slideGenerators.push((slide) => {
      cards.forEach((row, rowIndex) => {
        const ROWS_COUNT = Math.max(2, row.length);
        const COLS_COUNT = Math.max(2, cards.length);

        // Calculate cell size based on the number of rows
        const CELL_SIZE = (width - SPACER_SIZE * (ROWS_COUNT - 1)) / ROWS_COUNT;

        // Calculate column size based on the number of columns
        let COL_SIZE = (height - SPACER_SIZE * (COLS_COUNT - 1)) / COLS_COUNT;

        // Calculate offsets for positioning the cells
        const X_OFFSET = CELL_SIZE + SPACER_SIZE;
        const Y_OFFSET = COL_SIZE + SPACER_SIZE;

        let Y_BASE = rowIndex * Y_OFFSET;

        // Center the cards vertically if there's only one row
        if (cards.length === 1) {
          Y_BASE = (height - COL_SIZE) / 2;
        }

        row.forEach((col, colIndex) => {
          let X_BASE = colIndex * X_OFFSET;

          if (row.length === 1) {
            X_BASE = (width - CELL_SIZE) / 2;
          }

          slide.addTable(
            [
              [
                {
                  text: [
                    {
                      text: col.title,
                      options: {
                        fontSize: 14,
                        breakLine: true,
                      },
                    },
                    {
                      text: this.formatValue(col.value, col.format),
                      options: {
                        fontSize: 24,
                        bold: true,
                      },
                    },
                  ],
                },
              ],
            ],
            {
              x: this.config.margin.left + X_BASE,
              y: this.config.margin.top + Y_BASE,
              w: CELL_SIZE,
              h: COL_SIZE,
              color: "3D3D3D",
              border: {
                color: "cccccc",
                pt: this.config.borderSize,
              },
              align: "center",
              valign: "middle",
            }
          );
        });
      });
    });

    return this;
  }

  addBoxesSlide(payload: { title: string; data: Card[][] }) {
    const BORDER_SIZE = 1;
    const SPACER_SIZE = 0.25;
    const { width, height } = this.getSizes();

    this.slideGenerators.push((slide) => {
      this.addSlideTitle(slide, payload.title);

      payload.data.forEach((row, rowIndex) => {
        const ROWS_COUNT = row.length;
        const COLS_COUNT = Math.max(2, payload.data.length);

        // Calculate cell size based on the number of rows
        const CELL_SIZE = (width - SPACER_SIZE * (ROWS_COUNT - 1)) / ROWS_COUNT;

        // Calculate column size based on the number of columns
        let COL_SIZE = (height - SPACER_SIZE * (COLS_COUNT - 1)) / COLS_COUNT;

        // Calculate offsets for positioning the cells
        const X_OFFSET = CELL_SIZE + SPACER_SIZE;
        const Y_OFFSET = COL_SIZE + SPACER_SIZE;

        let Y_BASE = rowIndex * Y_OFFSET;

        // Center the cards vertically if there's only one row
        if (cards.length === 1) {
          Y_BASE = (height - COL_SIZE) / 2;
        }

        row.forEach((col, colIndex) => {
          slide.addText(
            [
              {
                text: col.title,
                options: {
                  fontSize: 14,
                  breakLine: true,
                },
              },
              {
                text: this.formatValue(col.value, col.format),
                options: {
                  fontSize: 24,
                  bold: true,
                },
              },
            ],
            {
              shape: this.presentation.ShapeType.roundRect,
              x: this.config.margin.left + colIndex * X_OFFSET,
              y: this.config.margin.top + Y_BASE,
              w: CELL_SIZE,
              h: COL_SIZE,
              align: "center",
              fontSize: 14,
              rectRadius: this.config.roundess,
              line: {
                color: "cccccc",
                size: BORDER_SIZE,
              },
            }
          );
        });
      });
    });

    return this;
  }

  addTableSlide(payload: {
    title: string;
    headers: TableHeaderEntity[];
    data: PowerPointTableCellEntity[][];
  }) {
    const { width } = this.getSizes();

    const headers: pptxgen.TableCell[] = payload.headers.map((header) => {
      return {
        text: header.text,
        options: {
          bold: true,
        },
      };
    });

    const content = payload.data.map((row, index) => {
      return row.map((column, columnIndex) => {
        const heatMap = payload.headers[columnIndex].heatMap;

        const entity: pptxgen.TableCell = {
          text: this.formatValue(column.value, column.format),
          options: {},
        };

        // Apply background color for odd rows
        if (index % 2 === 0) {
          entity.options!.fill = {
            color: "f5f5f5",
          };
        }

        // Check if heatmap is defined and the value is a number
        // Otherwise, log a warning
        if (heatMap && typeof column.value !== "number") {
          console.warn(
            `Heatmap color is defined for column "${column.value}" but the value is not a number.`
          );
        }

        // Apply heatmap color if defined
        if (isNumber(column.value) && heatMap) {
          const color = generateHeatmapColor(
            column.value,
            heatMap.minValue,
            heatMap.maxValue,
            heatMap.colorPalette
          );
          const textColor = getTextColorByBackground(color);

          entity.options!.fill = {
            color: stripHexHash(color),
          };

          entity.options!.color = stripHexHash(textColor);
        }

        return entity;
      });
    });

    this.slideGenerators.push((slide) => {
      this.addSlideTitle(slide, payload.title);

      slide.addTable(
        [
          // Header
          headers,

          // Content
          ...content,
        ],
        {
          x: this.config.margin.left,
          y: this.config.margin.top,
          w: width,
          autoPage: true,
          autoPageSlideStartY: this.config.margin.bottom,
          autoPageLineWeight: 0.65,
          valign: "middle",
          border: {
            pt: 1,
            color: "cccccc",
          },
          margin: 0.1,
          fontSize: 14,
        }
      );
    });

    return this;
  }

  addBarChartSlide(
    payload: {
      title: string;
      data: PowerPointChartDataEntity[];
      lines?: Pick<PowerPointChartDataEntity, "values" | "name" | "color">[];
      labelFormatCode?: string;
    },
    options: {
      normalizeData?: boolean;
    } = {}
  ) {
    const { width, height } = this.getSizes();
    const PADDING = 0.25;
    const shouldRenderLines =
      Array.isArray(payload.lines) && payload.lines.length > 0;

    this.slideGenerators.push((slide) => {
      this.addSlideTitle(slide, payload.title);

      slide.addShape("roundRect", {
        x: this.config.margin.left,
        y: this.config.margin.top,
        w: width,
        h: height,
        rectRadius: this.config.roundess,
        line: {
          color: "cccccc",
          size: this.config.borderSize,
        },
      });

      const chartOptions: pptxgen.IChartOpts = {
        x: this.config.margin.left + PADDING,
        y: this.config.margin.top + PADDING,
        w: width - 2 * PADDING,
        h: height - 2 * PADDING,
        barDir: "col",
        valAxisLabelFormatCode: payload.labelFormatCode,
        barGapWidthPct: 25,
        valGridLine: {
          style: "none",
        },
        showLegend: true,
        legendPos: "b",
        legendFontSize: 12,
        showValue: !shouldRenderLines,
        dataLabelFormatCode: payload.labelFormatCode,
      };

      let entities: pptxgen.IChartMulti[] = [
        {
          type: "bar",
          data: payload.data.map((entity) => {
            return {
              name: entity.name,
              values: entity.values,
              labels: entity.labels,
            };
          }),
          options: {
            chartColors: payload.data.map((entity) => entity.color),
          },
        },
      ];

      if (shouldRenderLines) {
        const lines = payload.lines!;

        entities.push({
          type: "line",
          data: lines.map((entity) => {
            return {
              name: entity.name,
              values: entity.values,
              labels: [],
            };
          }),
          options: {
            chartColors: lines.map((entity) => entity.color),
            showValue: false,
          },
        });
      }

      if (options.normalizeData) {
        entities = normalizeBarsChartData(entities);
      }

      slide.addChart(
        entities,
        // @ts-expect-error
        chartOptions
      );
    });

    return this;
  }

  addPieChartSlide(payload: { title: string; data: PowerPointPieChartData }) {
    const { width, height } = this.getSizes();
    const PADDING = 0.25;

    const labels = payload.data.labels.map((label, index) => {
      return `${label} - ${payload.data.values[index]}`;
    });

    const colors = payload.data.values.map(
      (_value, index) => payload.data.colors[index % payload.data.colors.length]
    );

    this.slideGenerators.push((slide) => {
      this.addSlideTitle(slide, payload.title);

      slide.addChart(
        "pie",
        [
          {
            name: payload.data.name,
            labels: labels,
            values: payload.data.values,
          },
        ],
        {
          x: this.config.margin.left + PADDING,
          y: this.config.margin.top + PADDING,
          w: width - 2 * PADDING,
          h: height - 2 * PADDING,
          chartColors: colors,
          dataBorder: {
            pt: 2,
            color: "ffffff",
          },
          legendPos: "r",
          showLegend: true,
          showLeaderLines: true,
          showValue: false,
        }
      );
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
    const result: PowerPointTableCellEntity[] = [
      { value: entity._id.subProduct },
      { value: entity.impressions, format: formatPowerPointNumber },
      { value: entity.clicks, format: formatPowerPointNumber },
      { value: entity.ctr, format: formatPowerPointPercent },
      { value: entity.conversions, format: formatPowerPointNumber },
    ];

    return result;
  }),
});

const videoComletes = getMinMax(videoProductPerformance, "videoCompletions");
const videoClicks = getMinMax(videoProductPerformance, "clicks");
const entities = videoProductPerformance.map((entity) => {
  const result: PowerPointTableCellEntity[] = [
    { value: entity._id.subProduct },
    { value: entity.impressions, format: formatPowerPointNumber },
    { value: entity.videoCompletions, format: formatPowerPointNumber },
    { value: entity.vcr, format: formatPowerPointPercent },
    { value: entity.clicks, format: formatPowerPointNumber },
    { value: entity.ctr, format: formatPowerPointPercent },
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
        format: formatPowerPointPercent,
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
    format: formatPowerPointPercent,
  },
  {
    title: "Clicks",
    value: 42000,
    format: formatNumberWithSuffix,
  },
  {
    title: "CTR(%)",
    value: 0.17,
    format: formatPowerPointPercent,
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
