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
import { config } from "../config";
import path from "node:path";

const TEXT_FONT_SIZE = 10;
const TEXT_COLOR = "000000";
const TEXT_VALUE_FONT_SIZE = 14;
const COMPARE_TEXT_COLOR = "9e9e9e";
const DECREASE_INDICATOR_COLOR = "d32f2f";
const INCREASE_INDICATOR_COLOR = "2e7d32";

export type PowerPointBoxEntity = {
  title: string;
  value: PowerPointValue;
  prevValue?: PowerPointValue;
  changePercentage?: number;
  format?: PowerPointValueFormatter;
};

export type PowerPointInfoBlockPayload = {
  data: PowerPointBoxEntity[][];
};

export class PowerPointInfoBlocks {
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
          fontSize: TEXT_FONT_SIZE,
          breakLine: true,
          color: TEXT_COLOR,
        },
      },
      {
        text: formatValue(entity.value, {
          formatter: entity.format,
        }),
        options: {
          fontSize: TEXT_VALUE_FONT_SIZE,
          bold: true,
          breakLine: true,
          color: TEXT_COLOR,
        },
      },
    ];

    if (isNumber(entity.changePercentage)) {
      const value = formatValue(entity.changePercentage, {
        formatter: entity.format,
      });
      const changeIndicator = determineChangeIndicator(entity.changePercentage);

      let text = `${value}`;
      let color = TEXT_COLOR;

      if (changeIndicator === "decrease") {
        text = `${value} ▼`;
        color = DECREASE_INDICATOR_COLOR;
      }

      if (changeIndicator === "increase") {
        text = `${value} ▲`;
        color = INCREASE_INDICATOR_COLOR;
      }

      texts.push({
        text,
        options: {
          fontSize: TEXT_FONT_SIZE,
          breakLine: true,
          color,
        },
      });
    }

    if (isNumber(entity.prevValue)) {
      const value = formatValue(entity.prevValue, {
        formatter: entity.format,
      });

      texts.push({
        text: `vs ${value} prev.`,
        options: {
          fontSize: TEXT_FONT_SIZE,
          color: COMPARE_TEXT_COLOR,
        },
      });
    }

    return texts;
  }

  renderRoundedRectangles(
    slide: pptxgen.Slide,
    payload: PowerPointInfoBlockPayload,
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
          rectRadius: this.config.roundess,
          fontFace: this.config.fontFamily,
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
    payload: PowerPointInfoBlockPayload,
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

        const size = Math.min(1.25, info.height);
        const offset = 0.1;
        const totalWidth =
          row.length * size + (row.length - 1) * this.config.spacer;
        const leftOffset = slideConfig.x + (slideConfig.width - totalWidth) / 2;
        const topOffset = info.y + info.height / 2 - size / 2;
        const x = leftOffset + (size + this.config.spacer) * colIndex;
        const y = topOffset;

        const texts = this.getTexts(col);
        const backgroundImage = path.join(config.path.images, "circle-bg.png");

        slide.addImage({
          x: x - offset / 2,
          y: y - offset / 2,
          w: size + offset,
          h: size + offset,
          path: backgroundImage,
        });

        if (this.config.debug) {
          slide.addShape("ellipse", {
            x,
            y,
            w: size,
            h: size,
            line: {
              color: "FF0000",
              size: this.config.border.size,
            },
          });
        }

        slide.addText(texts, {
          x: leftOffset + (size + this.config.spacer) * colIndex,
          y: topOffset,
          w: size,
          h: size,
          align: "center",
          fontFace: this.config.fontFamily,
        });
      });
    });
  }
}
