import {
  PowerPointConfig,
  PowerPointSlideOptions,
  PowerPointSlideConfig,
} from "../types/powerpoint.types";
import pptxgen from "pptxgenjs";
import { isNumber } from "../utils/common";

const HEADER_HEIGHT = 0.4;
const FOOTER_HEIGHT = 0.3;
const HORIZONTAL_OFFSET = 0.1;
const CONTENT_TITLE_HEIGHT = 0.25;
const CONTENT_TITLE_HORIZONTAL_OFFSET = 0.05;

// Slide title size + bottom offset
export const SLIDE_TITLE_FULL_HEIGHT = CONTENT_TITLE_HEIGHT + 0.15;

export class PowerPointLayout {
  private config: PowerPointConfig;

  constructor(config: PowerPointConfig) {
    this.config = config;
  }

  getSlideSizes(options: Partial<PowerPointSlideOptions> = {}) {
    const horizontal = this.config.margin.left + this.config.margin.right;
    const vertical = this.config.margin.top + this.config.margin.bottom;
    let height =
      this.config.slide.height - vertical - HEADER_HEIGHT - FOOTER_HEIGHT;

    if (options.markup?.text.content) {
      height -= SLIDE_TITLE_FULL_HEIGHT;
    }

    if (isNumber(options.markup?.contentVerticalOffset)) {
      height -= options.markup.contentVerticalOffset * 2;
    }

    return {
      width: this.config.slide.width - horizontal,
      height,
    };
  }

  getContentCoords(options: Partial<PowerPointSlideOptions> = {}) {
    let y = HEADER_HEIGHT + this.config.margin.top;

    // If content text is provided, add an offset
    if (options.markup?.text.content) {
      y += SLIDE_TITLE_FULL_HEIGHT;
    }

    // If vertical offset is specified, add an offset
    if (isNumber(options.markup?.contentVerticalOffset)) {
      y += options.markup.contentVerticalOffset;
    }

    return {
      x: this.config.margin.left,
      y,
    };
  }

  getCardSizeByRowCol(payload: {
    rowsCount: number;
    colsCount: number;
    rowIndex: number;
    colIndex: number;
    sizes: {
      width: number;
      height: number;
    };
    coords: {
      x: number;
      y: number;
    };
  }) {
    const { rowsCount, colsCount, rowIndex, colIndex, sizes, coords } = payload;

    // Calculate cell size based on the number of rows
    const CELL_SIZE =
      (sizes.width - this.config.spacer * (rowsCount - 1)) / rowsCount;

    // Calculate column size based on the number of columns
    let COL_SIZE =
      (sizes.height - this.config.spacer * (colsCount - 1)) / colsCount;

    // Calculate offsets for positioning the cells
    const X_OFFSET = CELL_SIZE + this.config.spacer;
    const Y_OFFSET = COL_SIZE + this.config.spacer;

    let Y_BASE = rowIndex * Y_OFFSET;

    // Center the cards vertically if there's only one row
    if (colsCount === 1) {
      Y_BASE = (sizes.height - COL_SIZE) / 2;
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
      h: HEADER_HEIGHT,
      w: this.config.slide.width,
      fill: {
        color: "FF0000",
      },
    });

    slide.addText(text, {
      x: HORIZONTAL_OFFSET,
      y: 0,
      w: this.config.slide.width - HORIZONTAL_OFFSET * 2,
      h: HEADER_HEIGHT,
      valign: "middle",
      bold: false,
      fontSize: 16,
      margin: 0,
      color: "FFFFFF",
    });
  }

  renderFooter(slide: pptxgen.Slide, text: string) {
    const width = this.config.slide.width;
    const height = this.config.slide.height - FOOTER_HEIGHT;

    slide.addShape("rect", {
      x: 0,
      y: height,
      w: this.config.slide.width,
      h: FOOTER_HEIGHT,
      fill: {
        color: "0000FF",
      },
    });

    slide.addText(text, {
      x: HORIZONTAL_OFFSET,
      y: height,
      w: width - HORIZONTAL_OFFSET * 2,
      h: FOOTER_HEIGHT,
      valign: "middle",
      align: "right",
      fontSize: 10,
      bold: false,
      margin: 0,
      color: "FFFFFF",
    });
  }

  renderSlideMarkup(slide: pptxgen.Slide, options: PowerPointSlideOptions) {
    this.renderHeader(slide, options.markup.text.header);
    this.renderFooter(slide, options.markup.text.footer);

    if (options.markup.text.content) {
      const sizes = this.getSlideSizes(options);
      let y = HEADER_HEIGHT + this.config.margin.top;

      if (isNumber(options.markup.contentVerticalOffset)) {
        y += options.markup.contentVerticalOffset;
      }

      this.renderContentTitle(slide, options.markup.text.content, {
        width: sizes.width,
        x: this.config.margin.left,
        y,
      });
    }
  }

  renderContentTitle(
    slide: pptxgen.Slide,
    title: string,
    slideConfig: Omit<PowerPointSlideConfig, "height">
  ) {
    // Add a background shape first, then overlay text for better control over padding and layout.
    slide.addShape("rect", {
      x: slideConfig.x,
      y: slideConfig.y,
      w: slideConfig.width,
      h: CONTENT_TITLE_HEIGHT,
      fill: {
        color: "eeeeee",
      },
    });

    slide.addText(title, {
      x: slideConfig.x + CONTENT_TITLE_HORIZONTAL_OFFSET,
      y: slideConfig.y,
      w: slideConfig.width - HORIZONTAL_OFFSET * 2,
      h: CONTENT_TITLE_HEIGHT,
      valign: "middle",
      bold: true,
      fontSize: 12,
      margin: 0,
    });
  }
}
