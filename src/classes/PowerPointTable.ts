import pptxgen from "pptxgenjs";
import {
  Formatter,
  PowerPointConfig,
  PowerPointLayoutConfig,
  PowerPointValue,
  PowerPointSlideConfig,
} from "../types/common";
import {
  generateHeatmapColor,
  getTextColorByBackground,
  isNumber,
  stripHexHash,
} from "../utils/common";
import { formatValue } from "../utils/formatters";
import { PowerPointLayout } from "./PowerPointLayout";

type PowerPointTableTableHeader = {
  text: string;
  heatMap?: {
    colorPalette: [string, string];
    maxValue: number;
    minValue: number;
  };
};

export type PowerPointTableCell = {
  value: PowerPointValue;
  format?: Formatter;
};

export type PowerPointTablePayload = PowerPointLayoutConfig & {
  headers: PowerPointTableTableHeader[];
  data: PowerPointTableCell[][];
};

export class PowerPointTable {
  private config: PowerPointConfig;
  private layout: PowerPointLayout;

  constructor(config: PowerPointConfig, layout: PowerPointLayout) {
    this.config = config;
    this.layout = layout;
  }

  render(
    slide: pptxgen.Slide,
    payload: PowerPointTablePayload,
    slideConfig: PowerPointSlideConfig
  ) {
    this.layout.renderSlideMarkup(slide, {
      markup: payload.markup,
    });

    const coords = this.layout.getContentCoords(payload.markup);

    const headers: pptxgen.TableCell[] = payload.headers.map((header) => {
      return {
        text: header.text,
        options: {
          bold: true,
        },
      };
    });

    const content = payload.data.map((row, index) => {
      return row.map((column, columnIndex) => {
        const heatMap = payload.headers[columnIndex].heatMap;

        const entity: pptxgen.TableCell = {
          text: formatValue(column.value, column.format),
          options: {},
        };

        // Apply background color for odd rows
        if (index % 2 === 0) {
          entity.options!.fill = {
            color: "f5f5f5",
          };
        }

        // Check if heatmap is defined and the value is a number
        if (heatMap && typeof column.value !== "number") {
          console.warn(
            `Heatmap color is defined for column "${column.value}" but the value is not a number.`
          );
        }

        // Apply heatmap color if defined
        if (isNumber(column.value) && heatMap) {
          const color = generateHeatmapColor(
            column.value,
            heatMap.minValue,
            heatMap.maxValue,
            heatMap.colorPalette
          );
          const textColor = getTextColorByBackground(color);

          entity.options!.fill = {
            color: stripHexHash(color),
          };

          entity.options!.color = stripHexHash(textColor);
        }

        return entity;
      });
    });

    slide.addTable(
      [
        // Header
        headers,

        // Content
        ...content,
      ],
      {
        x: coords.x,
        y: coords.y,
        w: slideConfig.width,
        autoPage: true,
        autoPageSlideStartY: this.config.margin.bottom,
        autoPageLineWeight: 0.65,
        valign: "middle",
        border: {
          pt: this.config.border.size,
          color: this.config.border.color,
        },
        margin: 0.1,
        fontSize: 14,
      }
    );
  }
}
