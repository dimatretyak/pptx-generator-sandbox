import { PowerPointConfig } from "../types/common";
import pptxgen from "pptxgenjs";

const HEADER_SIZE = 0.75;
const FOOTER_SIZE = 0.75;
const SLIDE_TITLE_SIZE = 0.5;
const SLIDE_TITLE_SPACER = 0.25;

export class PowerPointLayout {
  private config: PowerPointConfig;

  constructor(config: PowerPointConfig) {
    this.config = config;
  }

  getSlideSizes() {
    const horizontal = this.config.margin.left + this.config.margin.right;
    const vertical = this.config.margin.top + this.config.margin.bottom;

    return {
      width: this.config.slide.width - horizontal,
      height:
        this.config.slide.height -
        vertical -
        HEADER_SIZE -
        FOOTER_SIZE -
        SLIDE_TITLE_SIZE -
        SLIDE_TITLE_SPACER,
    };
  }

  getContentCoords() {
    return {
      x: this.config.margin.left,
      y:
        HEADER_SIZE +
        SLIDE_TITLE_SIZE +
        this.config.margin.top +
        SLIDE_TITLE_SPACER,
    };
  }

  getCardSizeByRowCol(payload: {
    rowsCount: number;
    colsCount: number;
    rowIndex: number;
    colIndex: number;
  }) {
    const { rowsCount, colsCount, rowIndex, colIndex } = payload;
    const slide = this.getSlideSizes();

    // Calculate cell size based on the number of rows
    const CELL_SIZE =
      (slide.width - this.config.spacer * (rowsCount - 1)) / rowsCount;

    // Calculate column size based on the number of columns
    let COL_SIZE =
      (slide.height - this.config.spacer * (colsCount - 1)) / colsCount;

    // Calculate offsets for positioning the cells
    const X_OFFSET = CELL_SIZE + this.config.spacer;
    const Y_OFFSET = COL_SIZE + this.config.spacer;

    let Y_BASE = rowIndex * Y_OFFSET;

    // Center the cards vertically if there's only one row
    if (colsCount === 1) {
      Y_BASE = (slide.height - COL_SIZE) / 2;
    }

    return {
      x: this.config.margin.left + colIndex * X_OFFSET,
      y: this.config.margin.top + Y_BASE,
      width: CELL_SIZE,
      height: COL_SIZE,
    };
  }

  renderSlideMarkup(
    slide: pptxgen.Slide,
    payload: {
      title?: string;
    } = {}
  ) {
    slide.addText("Header", {
      x: 0,
      y: 0,
      h: HEADER_SIZE,
      valign: "middle",
      bold: true,
      fontSize: 18,
      margin: 0,
      w: this.config.slide.width,
      fill: { color: "FF0000" },
    });

    slide.addText("Bottom", {
      x: 0,
      y: this.config.slide.height - FOOTER_SIZE,
      h: FOOTER_SIZE,
      valign: "middle",
      bold: true,
      fontSize: 18,
      margin: 0,
      w: this.config.slide.width,
      fill: { color: "0000FF" },
    });

    if (payload.title) {
      this.renderContentTitle(slide, payload.title);
    }
  }

  renderContentTitle(slide: pptxgen.Slide, title: string) {
    const sizes = this.getSlideSizes();

    slide.addText(title, {
      x: this.config.margin.left,
      y: HEADER_SIZE + this.config.margin.top,
      h: SLIDE_TITLE_SIZE,
      valign: "middle",
      bold: true,
      fontSize: 18,
      margin: 0,
      w: sizes.width,
      fill: { color: "00FF00" },
    });
  }
}
