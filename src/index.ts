import pptxgen from "pptxgenjs";
import {
  Card,
  Formatter,
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
      margin: {
        top: 0.25,
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

  addCardsSlide(cards: Card[][]) {
    const BORDER_SIZE = 1;
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
                pt: BORDER_SIZE,
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

  addBoxesSlide(cards: Card[][]) {
    const BORDER_SIZE = 1;
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
              x: this.config.margin.left + X_BASE,
              y: this.config.margin.top + Y_BASE,
              w: CELL_SIZE,
              h: COL_SIZE,
              align: "center",
              fontSize: 14,
              rectRadius: 0.025,
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
      slide.addText(payload.title, {
        x: this.config.margin.top,
        h: this.config.margin.bottom,
        valign: "middle",
        bold: true,
        fontSize: 18,
      });

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
          autoPageSlideStartY: this.config.margin.top,
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

  buildAndSave(fileName: string) {
    for (const generateSlide of this.slideGenerators) {
      const slide = this.presentation.addSlide();
      generateSlide(slide);
    }

    this.presentation.writeFile({ fileName });
  }
}

const builder = new PresentationBuilder();

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
  data: videoProductPerformance.map((entity) => {
    const result: PowerPointTableCellEntity[] = [
      { value: entity._id.subProduct },
      { value: entity.impressions, format: formatPowerPointNumber },
      { value: entity.videoCompletions, format: formatPowerPointNumber },
      { value: entity.vcr, format: formatPowerPointPercent },
      { value: entity.clicks, format: formatPowerPointNumber },
      { value: entity.ctr, format: formatPowerPointPercent },
    ];

    return result;
  }),
});

builder.addBoxesSlide([
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
]);

// Add slides with cards
// for (const data of cards) {
//   builder.addBoxesSlide(data);
// }

builder.buildAndSave("output/demo.pptx");
