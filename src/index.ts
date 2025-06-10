import pptxgen from "pptxgenjs";
import {
  Card,
  TableCellEntity,
  TableCellEntityValue,
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
import { formatNumber, formatPercent } from "./utils/formatters";

// 16:9 aspect ratio
const LAYOUT_NAME = "APP";
const SLIDE_WIDTH = 10;
const SLIDE_HEIGHT = 5.625;
const FALLBACK_TABLE_CELL_VALUE = "-";

const formatTableCellNumber = (value: TableCellEntityValue) => {
  if (isNumber(value)) {
    return formatNumber(value);
  }

  if (isString(value)) {
    return value;
  }

  return FALLBACK_TABLE_CELL_VALUE;
};

const formatTableCellPercent = (value: TableCellEntityValue) => {
  if (isNumber(value)) {
    return formatPercent(value);
  }

  if (isString(value)) {
    return value;
  }

  return FALLBACK_TABLE_CELL_VALUE;
};

class PresentationBuilder {
  private slideGenerators: Array<(slide: pptxgen.Slide) => void> = [];
  private presentation: pptxgen;
  private config: {
    margin: number;
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
      margin: 0.25,
    };
  }

  private getSizes() {
    return {
      width: SLIDE_WIDTH - this.config.margin * 2,
      height: SLIDE_HEIGHT - this.config.margin * 2,
    };
  }

  private normalizeTableCellValue(cell: TableCellEntity) {
    if (typeof cell.normalizer === "function") {
      return cell.normalizer(cell.value);
    }

    if (isNumber(cell.value)) {
      return cell.value.toString();
    }

    if (isString(cell.value)) {
      return cell.value;
    }

    return FALLBACK_TABLE_CELL_VALUE;
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
                      text: col.value,
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
              x: this.config.margin + X_BASE,
              y: this.config.margin + Y_BASE,
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
                text: col.value,
                options: {
                  fontSize: 24,
                  bold: true,
                },
              },
            ],
            {
              shape: this.presentation.ShapeType.roundRect,
              x: this.config.margin + X_BASE,
              y: this.config.margin + Y_BASE,
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
    headers: TableHeaderEntity[];
    data: TableCellEntity[][];
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
          text: this.normalizeTableCellValue(column),
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
      slide.addTable(
        [
          // Header
          headers,

          // Content
          ...content,
        ],
        {
          x: this.config.margin,
          y: this.config.margin,
          w: width,
          autoPage: true,
          autoPageRepeatHeader: true,
          autoPageSlideStartY: this.config.margin,
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
    return [
      { value: entity._id.subProduct },
      { value: entity.impressions, normalizer: formatTableCellNumber },
      { value: entity.clicks, normalizer: formatTableCellNumber },
      { value: entity.ctr, normalizer: formatTableCellPercent },
      { value: entity.conversions, normalizer: formatTableCellNumber },
    ];
  }),
});

const videoComletes = getMinMax(videoProductPerformance, "videoCompletions");
const videoClicks = getMinMax(videoProductPerformance, "clicks");

builder.addTableSlide({
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
    return [
      { value: entity._id.subProduct },
      { value: entity.impressions, normalizer: formatTableCellNumber },
      { value: entity.videoCompletions, normalizer: formatTableCellNumber },
      { value: entity.vcr, normalizer: formatTableCellPercent },
      { value: entity.clicks, normalizer: formatTableCellNumber },
      { value: entity.ctr, normalizer: formatTableCellPercent },
    ];
  }),
});

// Add slides with cards
for (const data of cards) {
  builder.addBoxesSlide(data);
}

builder.buildAndSave("output/demo.pptx");
