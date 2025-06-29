import chroma from "chroma-js";
import { FALLBACK_POWERPOINT_VALUE } from "./formatters";
import { PowerPointBoxEntity } from "../classes/PowerPointInfoBlocks";
import {
  PowerPointValue,
  PowerPointValueFormatter,
} from "../types/powerpoint.types";
import {
  PowerPointTableCell,
  PowerPointTablePayload,
  PowerPointTableTableHeader,
} from "../classes/PowerPointTable";
import splitArrayIntoChunks from "./splitArrayIntoChunks";

// TODO: Reuse this function from Lumina in the future
export const getMinMax = <T>(data: T[], field: keyof T) => {
  const values = data
    .map((item) => (item[field] as number) ?? 0)
    .filter((value) => !isNaN(value));
  return { min: Math.min(...values), max: Math.max(...values) };
};

// TODO: Reuse this function from Lumina in the future
export const generateHeatmapColor = (
  value: number,
  min: number,
  max: number,
  colorPalette: [string, string]
): string => {
  const scale = chroma.scale(colorPalette).domain([min, max]);
  return scale(value).hex();
};

// TODO: Reuse this function from Lumina in the future
export const getTextColorByBackground = (backgroundColor: string) => {
  if (chroma.contrast(backgroundColor, "white") > 4.5) {
    return "#ffffff";
  }

  return "#000000";
};

// TODO: Reuse this function from Lumina in the future
export const determineChangeIndicator = (
  changePercentage: number | string
): "neutral" | "increase" | "decrease" => {
  if (typeof changePercentage !== "number") {
    changePercentage = Number(changePercentage.replace("%", "")) || 0;
  }
  if (changePercentage === 0) return "neutral";

  return changePercentage < 0 ? "decrease" : "increase";
};

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function preparePercentageValues(values: number[]) {
  return values.map((value) => value / 100);
}

export function extractInfoBlockData<Data = Record<string, unknown>>(
  entities: { text: string; fieldExtract: (value: Data) => PowerPointValue }[],
  data: Data[],
  options: {
    perChunk?: number;
  } = {}
): PowerPointBoxEntity[][] {
  const results = entities.map((entity) => {
    const value = entity.fieldExtract(data[0]);

    return {
      title: entity.text,
      value: (value ?? FALLBACK_POWERPOINT_VALUE) as PowerPointValue,
    };
  });

  return splitArrayIntoChunks(results, options.perChunk ?? 5);
}

export function extractTableData<
  Data extends Record<string, unknown> = Record<string, unknown>
>(
  entities: {
    text: string;
    heatMapColor?: string;
    format?: PowerPointValueFormatter;
    fieldExtractor: (v: Data) => PowerPointValue | null;
  }[],
  data: Data[],
  options: Pick<PowerPointTablePayload, "autoPagination"> = {}
): PowerPointTablePayload {
  const headers = entities.map((entity) => {
    const result: PowerPointTableTableHeader = {
      text: entity.text,
    };

    // Add heat map field
    if (entity.heatMapColor) {
      const values = data.map((dataEntity) => {
        const value = entity.fieldExtractor(dataEntity);

        if (isNumber(value)) {
          return value;
        }

        return 0;
      });

      const colorPalette: [string, string] = [
        chroma(entity.heatMapColor).brighten(3).hex(),
        entity.heatMapColor,
      ];

      result.heatMap = {
        colorPalette,
        maxValue: Math.max(...values),
        minValue: Math.min(...values),
      };
    }

    return result;
  });

  const values: PowerPointTableCell[][] = data.map((v) => {
    return entities.map((entity) => {
      const extracted = entity.fieldExtractor(v);
      const value = (extracted ?? FALLBACK_POWERPOINT_VALUE) as PowerPointValue;

      return {
        value,
        formater: entity.format,
      };
    });
  });

  return {
    headers,
    data: values.slice(0, 5),
    ...options,
  };
}

export function extractMonthLabels<
  Data extends {
    [key: string]: unknown;
    _id: {
      monthYearNumbers: string;
    };
  }
>(data: Data[]) {
  return data.map((v) => v._id.monthYearNumbers);
}
