import { PowerPointConfig } from "../types/common";

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
      height: this.config.slide.height - vertical,
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
}
