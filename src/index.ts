import pptxgen from "pptxgenjs";
import path from "node:path";

// 16:9 aspect ratio
const LAYOUT_NAME = "APP";
const SLIDE_WIDTH = 10;
const SLIDE_HEIGHT = 5.625;

type Card = {
  title: string;
  value: string;
};

class PresentationBuilder {
  private slideGenerators: Array<(slide: pptxgen.Slide) => void> = [];

  private presentation: pptxgen;

  constructor() {
    this.presentation = new pptxgen();

    this.presentation.defineLayout({
      name: LAYOUT_NAME,
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
    });

    this.presentation.layout = LAYOUT_NAME;
  }

  addWelcomeSlide() {
    this.slideGenerators.push((slide) => {
      slide.addText("Hello World from PptxGenJS!", {
        x: 1,
        y: 1,
        color: "FF0000",
      });
    });

    return this;
  }

  addMediaSlide() {
    this.slideGenerators.push((slide) => {
      slide.addImage({
        path: path.join(__dirname, "assets", "images", "avatar.jpeg"),
        x: 1,
        y: 1,
      });
    });

    return this;
  }

  addShapeSlide() {
    this.slideGenerators.push((slide) => {
      slide.addShape(this.presentation.ShapeType.hexagon, {
        x: 1,
        y: 1,
        w: 3,
        h: 3,
        fill: {
          color: "FF0000",
        },
        line: {
          color: "006400",
        },
        lineSize: 1,
      });
    });

    return this;
  }

  addSimpleTableSlide() {
    const MARGIN = 1;

    this.slideGenerators.push((slide) => {
      slide.addTable(
        [
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
          [
            {
              text: "111",
            },
            {
              text: "222",
            },
          ],
        ],
        {
          autoPage: true,
          x: MARGIN,
          y: MARGIN,
          margin: 0.1,
          w: SLIDE_WIDTH - MARGIN * 2,
          h: SLIDE_HEIGHT - MARGIN * 2,
          border: {
            color: "9F9F9F",
          },
        }
      );
    });

    return this;
  }

  addTableSlide() {
    this.slideGenerators.push((slide) => {
      const rows: pptxgen.TableRow[] = [
        [
          {
            text: "Top Lft",
            options: { valign: "top", align: "left", fontFace: "Arial" },
          },
          {
            text: "Top Ctr",
            options: { valign: "top", align: "center", fontFace: "Courier" },
          },
          {
            text: "Top Rgt",
            options: { valign: "top", align: "right", fontFace: "Verdana" },
          },
        ],
        [
          { text: "Mdl Lft", options: { valign: "middle", align: "left" } },
          { text: "Mdl Ctr", options: { valign: "middle", align: "center" } },
          { text: "Mdl Rgt", options: { valign: "middle", align: "right" } },
        ],
        [
          { text: "Btm Lft", options: { valign: "bottom", align: "left" } },
          { text: "Btm Ctr", options: { valign: "bottom", align: "center" } },
          { text: "Btm Rgt", options: { valign: "bottom", align: "right" } },
        ],
      ];

      slide.addTable(rows, {
        x: 0.5,
        y: 1.1,
        rowH: 0.75,
        fill: {
          color: "F7F7F7",
        },
        fontSize: 14,
        color: "363636",
        border: {
          color: "BBCCDD",
        },
      });
    });

    return this;
  }

  addChartSlide() {
    this.slideGenerators.push((slide) => {
      let dataChartAreaLine = [
        {
          name: "Actual Sales",
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          values: [
            1500, 4600, 5156, 3167, 8510, 8009, 6006, 7855, 12102, 12789, 10123,
            15121,
          ],
        },
        {
          name: "Projected Sales",
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          values: [
            1000, 2600, 3456, 4567, 5010, 6009, 7006, 8855, 9102, 10789, 11123,
            12121,
          ],
        },
      ];

      slide.addChart(this.presentation.ChartType.line, dataChartAreaLine, {
        x: 1,
        y: 1,
        w: 8,
        h: 4,
      });
    });

    return this;
  }

  addCardsSlide(cards: Card[][]) {
    const BORDER_SIZE = 1;
    const SPACER_SIZE = 0.25;
    const MARGIN_SIZE = 0.25;
    const WIDTH = SLIDE_WIDTH - MARGIN_SIZE * 2;
    const HEIGHT = SLIDE_HEIGHT - MARGIN_SIZE * 2;

    this.slideGenerators.push((slide) => {
      cards.forEach((row, rowIndex) => {
        const ROWS_COUNT = Math.max(2, row.length);
        const COLS_COUNT = Math.max(2, cards.length);

        // Calculate cell size based on the number of rows
        const CELL_SIZE = (WIDTH - SPACER_SIZE * (ROWS_COUNT - 1)) / ROWS_COUNT;

        // Calculate column size based on the number of columns
        let COL_SIZE = (HEIGHT - SPACER_SIZE * (COLS_COUNT - 1)) / COLS_COUNT;

        // Calculate offsets for positioning the cells
        const X_OFFSET = CELL_SIZE + SPACER_SIZE;
        const Y_OFFSET = COL_SIZE + SPACER_SIZE;

        let Y_BASE = rowIndex * Y_OFFSET;

        // Center the cards vertically if there's only one row
        if (cards.length === 1) {
          Y_BASE = (HEIGHT - COL_SIZE) / 2;
        }

        row.forEach((col, colIndex) => {
          let X_BASE = colIndex * X_OFFSET;

          if (row.length === 1) {
            X_BASE = (WIDTH - CELL_SIZE) / 2;
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
              x: MARGIN_SIZE + X_BASE,
              y: MARGIN_SIZE + Y_BASE,
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

  buildAndSave(fileName: string) {
    for (const generateSlide of this.slideGenerators) {
      const slide = this.presentation.addSlide();
      generateSlide(slide);
    }

    this.presentation.writeFile({ fileName });
  }
}

const builder = new PresentationBuilder().addCardsSlide([
  [
    { title: "Impressions", value: "177M" },
    { title: "Clicks", value: "269K" },
    { title: "CTR(%)", value: "0.15%" },
  ],
  [
    { title: "111", value: "269K" },
    { title: "222", value: "0.15%" },
  ],
  [
    { title: "333", value: "269K" },
    { title: "444", value: "0.15%" },
    { title: "555", value: "0.15%" },
  ],
]);

builder.buildAndSave("output/demo.pptx");
