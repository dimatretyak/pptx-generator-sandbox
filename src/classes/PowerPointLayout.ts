import {
  PowerPointConfig,
  PowerPointLayoutConfig,
  PowerPointMarkup,
} from "../types/powerpoint.types";
import pptxgen from "pptxgenjs";
import { isNumber } from "../utils/common";

const HEADER_SIZE = 0.5;
const FOOTER_SIZE = 0.35;
const CONTENT_TITLE_SIZE = 0.35;
const SLIDE_TITLE_SPACER = 0.25;
const HORIZONTAL_OFFSET = 0.15;

export class PowerPointLayout {
  private config: PowerPointConfig;

  constructor(config: PowerPointConfig) {
    this.config = config;
  }

  getSlideSizes(payload: PowerPointMarkup) {
    const horizontal = this.config.margin.left + this.config.margin.right;
    const vertical = this.config.margin.top + this.config.margin.bottom;
    let height =
      this.config.slide.height -
      vertical -
      HEADER_SIZE -
      FOOTER_SIZE -
      CONTENT_TITLE_SIZE -
      SLIDE_TITLE_SPACER;

    if (isNumber(payload.contentVerticalOffset)) {
      height -= payload.contentVerticalOffset * 2;
    }

    return {
      width: this.config.slide.width - horizontal,
      height,
    };
  }

  getContentCoords(payload: PowerPointMarkup) {
    let y =
      HEADER_SIZE +
      CONTENT_TITLE_SIZE +
      this.config.margin.top +
      SLIDE_TITLE_SPACER;

    if (isNumber(payload.contentVerticalOffset)) {
      y += payload.contentVerticalOffset;
    }

    return {
      x: this.config.margin.left,
      y,
    };
  }

  getCardSizeByRowCol(
    payload: PowerPointLayoutConfig & {
      rowsCount: number;
      colsCount: number;
      rowIndex: number;
      colIndex: number;
    }
  ) {
    const { rowsCount, colsCount, rowIndex, colIndex, markup } = payload;
    const slide = this.getSlideSizes(markup);
    const coords = this.getContentCoords(markup);

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

  private renderHeader(slide: pptxgen.Slide, text: string) {
    slide.addShape("rect", {
      x: 0,
      y: 0,
      h: HEADER_SIZE,
      w: this.config.slide.width,
      fill: {
        color: "FF0000",
      },
    });

    slide.addText(text, {
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

  renderFooter(slide: pptxgen.Slide, text: string) {
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

    slide.addText(text, {
      x: HORIZONTAL_OFFSET,
      y: height,
      w: width - HORIZONTAL_OFFSET * 2,
      h: FOOTER_SIZE,
      valign: "middle",
      align: "right",
      fontSize: 14,
      margin: 0,
      color: "FFFFFF",
    });
  }

  renderSlideMarkup(slide: pptxgen.Slide, payload: PowerPointLayoutConfig) {
    this.renderHeader(slide, payload.markup.text.header);
    this.renderFooter(slide, payload.markup.text.footer);

    if (payload.markup.text.content) {
      this.renderContentTitle(slide, payload.markup);
    }
  }

  renderContentTitle(slide: pptxgen.Slide, markup: PowerPointMarkup) {
    const sizes = this.getSlideSizes(markup);
    let y = HEADER_SIZE + this.config.margin.top;

    if (isNumber(markup.contentVerticalOffset)) {
      y += markup.contentVerticalOffset;
    }

    // Add a background shape first, then overlay text for better control over padding and layout.
    slide.addShape("rect", {
      x: this.config.margin.left,
      y,
      w: sizes.width,
      h: CONTENT_TITLE_SIZE,
      fill: {
        color: "e7e6e6",
      },
    });

    slide.addText(markup.text.content, {
      x: this.config.margin.left + HORIZONTAL_OFFSET,
      y,
      w: sizes.width - HORIZONTAL_OFFSET * 2,
      h: CONTENT_TITLE_SIZE,
      valign: "middle",
      bold: true,
      fontSize: 14,
      margin: 0,
    });
  }
}
