import { PowerPointConfig } from "../types/common";
import pptxgen from "pptxgenjs";

const HEADER_SIZE = 0.5;
const FOOTER_SIZE = 0.35;
const SLIDE_TITLE_SIZE = 0.5;
const SLIDE_TITLE_SPACER = 0.25;
const HORIZONTAL_OFFSET = 0.15;

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
    const coords = this.getContentCoords();

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
      x: coords.x + colIndex * X_OFFSET,
      y: coords.y + Y_BASE,
      width: CELL_SIZE,
      height: COL_SIZE,
    };
  }

  private renderHeader(slide: pptxgen.Slide) {
    slide.addShape("rect", {
      x: 0,
      y: 0,
      h: HEADER_SIZE,
      w: this.config.slide.width,
      fill: {
        color: "FF0000",
      },
    });

    slide.addText("Header", {
      x: HORIZONTAL_OFFSET,
      y: 0,
      w: this.config.slide.width - HORIZONTAL_OFFSET * 2,
      h: HEADER_SIZE,
      valign: "middle",
      bold: true,
      fontSize: 18,
      margin: 0,
      color: "FFFFFF",
    });
  }

  renderFooter(slide: pptxgen.Slide) {
    const width = this.config.slide.width;
    const height = this.config.slide.height - FOOTER_SIZE;

    slide.addShape("rect", {
      x: 0,
      y: height,
      w: this.config.slide.width,
      h: FOOTER_SIZE,
      fill: {
        color: "0000FF",
      },
    });

    slide.addText("Bottom", {
      x: HORIZONTAL_OFFSET,
      y: height,
      w: width - HORIZONTAL_OFFSET * 2,
      h: FOOTER_SIZE,
      valign: "middle",
      align: "right",
      bold: true,
      fontSize: 18,
      margin: 0,
      color: "FFFFFF",
    });
  }

  renderSlideMarkup(
    slide: pptxgen.Slide,
    payload: {
      title?: string;
    } = {}
  ) {
    this.renderHeader(slide);
    this.renderFooter(slide);

    if (payload.title) {
      this.renderContentTitle(slide, payload.title);
    }
  }

  renderContentTitle(slide: pptxgen.Slide, title: string) {
    const sizes = this.getSlideSizes();

    // Add a background shape first, then overlay text for better control over padding and layout.
    slide.addShape("rect", {
      x: this.config.margin.left,
      y: HEADER_SIZE + this.config.margin.top,
      w: sizes.width,
      h: SLIDE_TITLE_SIZE,
      fill: {
        color: "e7e6e6",
      },
    });

    slide.addText(title, {
      x: this.config.margin.left + HORIZONTAL_OFFSET,
      y: HEADER_SIZE + this.config.margin.top,
      w: sizes.width - HORIZONTAL_OFFSET * 2,
      h: SLIDE_TITLE_SIZE,
      valign: "middle",
      bold: true,
      fontSize: 18,
      margin: 0,
    });
  }
}
