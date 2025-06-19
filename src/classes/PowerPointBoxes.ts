import pptxgen from "pptxgenjs";
import {
  PowerPointValueFormatter,
  PowerPointConfig,
  PowerPointValue,
  PowerPointSlideConfig,
} from "../types/powerpoint.types";
import { formatValue } from "../utils/formatters";
import { PowerPointLayout } from "./PowerPointLayout";
import { determineChangeIndicator, isNumber } from "../utils/common";

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

// const CIRCLE_SIZE =

export class PowerPointBoxes {
  private config: PowerPointConfig;
  private layout: PowerPointLayout;

  constructor(config: PowerPointConfig, layout: PowerPointLayout) {
    this.config = config;
    this.layout = layout;
  }

  private getTexts(entity: PowerPointBoxEntity) {
    const texts: pptxgen.TextProps[] = [
      {
        text: entity.title,
        options: {
          fontSize: 14,
          breakLine: true,
        },
      },
      {
        text: formatValue(entity.value, entity.format),
        options: {
          fontSize: 24,
          bold: true,
          breakLine: true,
        },
      },
    ];

    if (isNumber(entity.changePercentage)) {
      const value = formatValue(entity.changePercentage, entity.format);
      const changeIndicator = determineChangeIndicator(entity.changePercentage);

      let text = `${value}`;
      let color = "000000";

      if (changeIndicator === "decrease") {
        text = `${value} ▼`;
        color = "d32f2f";
      }

      if (changeIndicator === "increase") {
        text = `${value} ▲`;
        color = "2e7d32";
      }

      texts.push({
        text,
        options: {
          fontSize: 16,
          breakLine: true,
          color,
        },
      });
    }

    if (isNumber(entity.prevValue)) {
      texts.push({
        text: `vs ${formatValue(entity.prevValue, entity.format)} prev.`,
        options: {
          fontSize: 14,
          color: "9e9e9e",
        },
      });
    }

    return texts;
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

        const texts = this.getTexts(col);

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

  renderCircles(
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

        const size = 1.75;
        const totalWidth =
          row.length * size + (row.length - 1) * this.config.spacer;
        const leftOffset = slideConfig.x + (slideConfig.width - totalWidth) / 2;
        const topOffset = info.y + info.height / 2 - size / 2;

        const texts = this.getTexts(col);

        slide.addShape("ellipse", {
          x: leftOffset + (size + this.config.spacer) * colIndex,
          y: topOffset,
          w: size,
          h: size,
          line: {
            color: this.config.border.color,
            size: this.config.border.size,
          },
        });

        slide.addText(texts, {
          shape: "rect", // TODO: remove in the future
          x: leftOffset + (size + this.config.spacer) * colIndex,
          y: topOffset,
          w: size,
          h: size,
          align: "center",
        });
      });
    });
  }
}
