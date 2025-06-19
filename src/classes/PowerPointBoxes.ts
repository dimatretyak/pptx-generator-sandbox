import pptxgen from "pptxgenjs";
import {
  PowerPointValueFormatter,
  PowerPointConfig,
  PowerPointValue,
  PowerPointSlideConfig,
} from "../types/powerpoint.types";
import { formatValue } from "../utils/formatters";
import { PowerPointLayout } from "./PowerPointLayout";
import { isNumber } from "../utils/common";

export type PowerPointBoxEntity = {
  title: string;
  value: PowerPointValue;
  prevValue?: PowerPointValue;
  changePercentage?: number;
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
    slideConfig: PowerPointSlideConfig
  ) {
    payload.data.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const info = this.layout.getCardSizeByRowCol({
          rowsCount: row.length,
          colsCount: payload.data.length,
          rowIndex,
          colIndex,
          sizes: {
            width: slideConfig.width,
            height: slideConfig.height,
          },
          coords: {
            x: slideConfig.x,
            y: slideConfig.y,
          },
        });

        const texts: pptxgen.TextProps[] = [
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
              breakLine: true,
            },
          },
        ];

        if (isNumber(col.changePercentage)) {
          texts.push({
            text: formatValue(col.changePercentage, col.format),
            options: {
              fontSize: 16,
              breakLine: true,
            },
          });
        }

        if (isNumber(col.prevValue)) {
          texts.push({
            text: `vs ${formatValue(col.prevValue, col.format)} prev.`,
            options: {
              fontSize: 14,
              color: "9e9e9e",
            },
          });
        }

        slide.addText(texts, {
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
        });
      });
    });
  }
}
