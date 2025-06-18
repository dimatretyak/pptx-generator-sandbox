import pptxgen from "pptxgenjs";
import {
  PowerPointValueFormatter,
  PowerPointConfig,
  PowerPointValue,
  PowerPointSlideOptions,
} from "../types/powerpoint.types";
import { formatValue } from "../utils/formatters";
import { PowerPointLayout } from "./PowerPointLayout";

export type PowerPointBoxEntity = {
  title: string;
  value: PowerPointValue;
  format?: PowerPointValueFormatter;
};

export type PowerPointBoxesPayload = {
  data: PowerPointBoxEntity[][];
};

export class PowerPointBoxes {
  private config: PowerPointConfig;
  private layout: PowerPointLayout;

  constructor(config: PowerPointConfig, layout: PowerPointLayout) {
    this.config = config;
    this.layout = layout;
  }

  render(
    slide: pptxgen.Slide,
    payload: PowerPointBoxesPayload,
    options: PowerPointSlideOptions
  ) {
    payload.data.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const info = this.layout.getCardSizeByRowCol({
          rowsCount: row.length,
          colsCount: Math.max(2, payload.data.length),
          rowIndex,
          colIndex,
          markup: options.markup,
        });

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
              text: formatValue(col.value, col.format),
              options: {
                fontSize: 24,
                bold: true,
              },
            },
          ],
          {
            shape: "roundRect",
            x: info.x,
            y: info.y,
            w: info.width,
            h: info.height,
            align: "center",
            fontSize: 14,
            rectRadius: this.config.roundess,
            line: {
              color: this.config.border.color,
              size: this.config.border.size,
            },
          }
        );
      });
    });
  }
}
