import pptxgen from "pptxgenjs";
import {
  PowerPointValueFormatter,
  PowerPointConfig,
  PowerPointValue,
  PowerPointSlideConfig,
} from "../types/powerpoint.types";
import {
  generateHeatmapColor,
  getTextColorByBackground,
  isNumber,
} from "../utils/common";
import { formatValue } from "../utils/formatters";
import { stripHexHash } from "../utils/powerpoint/common";

export type PowerPointTableTableHeader = {
  text: string;
  heatMap?: {
    colorPalette: [string, string];
    maxValue: number;
    minValue: number;
  };
};

export type PowerPointTableCell = {
  value: PowerPointValue;
  format?: PowerPointValueFormatter;
  link?: string;
};

export type PowerPointTablePayload = {
  headers: PowerPointTableTableHeader[];
  data: PowerPointTableCell[][];
  autoPagination?: boolean;
};

export class PowerPointTable {
  private config: PowerPointConfig;

  constructor(config: PowerPointConfig) {
    this.config = config;
  }

  render(
    slide: pptxgen.Slide,
    payload: PowerPointTablePayload,
    slideConfig: PowerPointSlideConfig
  ) {
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

        let options: pptxgen.TableCellProps = {};

        if (column.link) {
          options.color = "6879d4";

          options.hyperlink = {
            url: column.link,
          };
        }

        const entity: pptxgen.TableCell = {
          text: formatValue(column.value, {
            formatter: column.format,
            compactNumber: false,
          }),
          options,
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

    const options: pptxgen.TableProps = {
      x: slideConfig.x,
      y: slideConfig.y,
      w: slideConfig.width,
      valign: "middle",
      border: {
        pt: this.config.border.size,
        color: this.config.border.color,
      },
      margin: 0.1,
      fontSize: 10,
    };

    if (payload.autoPagination) {
      options.autoPage = true;
      options.autoPageSlideStartY = this.config.margin.bottom;
      options.autoPageLineWeight = 0.65;
    }

    slide.addTable(
      [
        // Header
        headers,

        // Content
        ...content,
      ],
      options
    );
  }
}
