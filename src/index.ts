import pptxgen from "pptxgenjs";
import { Card } from "./types/common";
import { cards } from "./data/constants";

// 16:9 aspect ratio
const LAYOUT_NAME = "APP";
const SLIDE_WIDTH = 10;
const SLIDE_HEIGHT = 5.625;

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

  addTableSlide() {
    const { width } = this.getSizes();

    const data = [
      [
        { text: "Targeted Display" },
        { text: "111,126,221" },
        { text: "138,572" },
        { text: "0.12" },
        { text: "100,682" },
      ],
      [
        { text: "Addressable Display" },
        { text: "34,403,897" },
        { text: "67,073" },
        { text: "0.19" },
        { text: "2,910" },
      ],
      [
        { text: "Geo-Fencing w/ Foot Traffic" },
        { text: "26,429,698" },
        { text: "51,249" },
        { text: "0.19" },
        { text: "5,570" },
      ],
      [
        { text: "Social Display" },
        { text: "2,836,394" },
        { text: "8,214" },
        { text: "0.29" },
        { text: "1,265" },
      ],
      [
        { text: "Targeted Native" },
        { text: "2,217,828" },
        { text: "3,848" },
        { text: "0.17" },
        { text: "259" },
      ],
      [
        { text: "Targeted Display" },
        { text: "111,126,221" },
        { text: "138,572" },
        { text: "0.12" },
        { text: "100,682" },
      ],
      [
        { text: "Addressable Display" },
        { text: "34,403,897" },
        { text: "67,073" },
        { text: "0.19" },
        { text: "2,910" },
      ],
      [
        { text: "Geo-Fencing w/ Foot Traffic" },
        { text: "26,429,698" },
        { text: "51,249" },
        { text: "0.19" },
        { text: "5,570" },
      ],
      [
        { text: "Social Display" },
        { text: "2,836,394" },
        { text: "8,214" },
        { text: "0.29" },
        { text: "1,265" },
      ],
      [
        { text: "Targeted Native" },
        { text: "2,217,828" },
        { text: "3,848" },
        { text: "0.17" },
        { text: "259" },
      ],
      [
        { text: "Targeted Display" },
        { text: "111,126,221" },
        { text: "138,572" },
        { text: "0.12" },
        { text: "100,682" },
      ],
      [
        { text: "Addressable Display" },
        { text: "34,403,897" },
        { text: "67,073" },
        { text: "0.19" },
        { text: "2,910" },
      ],
      [
        { text: "Geo-Fencing w/ Foot Traffic" },
        { text: "26,429,698" },
        { text: "51,249" },
        { text: "0.19" },
        { text: "5,570" },
      ],
      [
        { text: "Social Display" },
        { text: "2,836,394" },
        { text: "8,214" },
        { text: "0.29" },
        { text: "1,265" },
      ],
      [
        { text: "Targeted Native" },
        { text: "2,217,828" },
        { text: "3,848" },
        { text: "0.17" },
        { text: "259" },
      ],
    ];

    const content = data.map((row, index) => {
      return row.map((cell) => {
        const entity: pptxgen.TableCell = {
          text: cell.text,
          options: {},
        };

        // Apply background color for odd rows
        if (index % 2 === 0) {
          entity.options!.fill = {
            color: "f5f5f5",
          };
        }

        return entity;
      });
    });

    this.slideGenerators.push((slide) => {
      slide.addTable(
        [
          // Header
          [
            { text: "Product" },
            { text: "Impressions" },
            { text: "Clicks" },
            { text: "CTR(%)" },
            { text: "Total Conversions" },
          ],

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

// Add slides with cards
// for (const data of cards) {
//   builder.addBoxesSlide(data);
// }

builder.addTableSlide();

builder.buildAndSave("output/demo.pptx");
