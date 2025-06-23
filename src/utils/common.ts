import chroma from "chroma-js";
import { FALLBACK_POWERPOINT_VALUE } from "./formatters";
import { PowerPointBoxEntity } from "../classes/PowerPointInfoBlocks";
import { PowerPointValue } from "../types/powerpoint.types";
import {
  PowerPointTableCell,
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

export function extractInfoBlockEntity<Data = Record<string, unknown>>(
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
  entities: (PowerPointTableTableHeader &
    Pick<PowerPointTableCell, "format"> & {
      fieldExtractor: (v: Data) => PowerPointValue | null;
    })[],
  data: Data[]
) {
  const headers: PowerPointTableTableHeader[] = entities.map((v) => {
    return {
      text: v.text,
      heatMap: v.heatMap,
    };
  });

  const values: PowerPointTableCell[][] = data.map((v) => {
    return entities.map((e) => {
      const value = e.fieldExtractor(v);

      return {
        value: (value ?? FALLBACK_POWERPOINT_VALUE) as PowerPointValue,
        formater: e.format,
      };
    });
  });

  return {
    headers,
    values: values.slice(0, 5),
  };
}
