import chroma from "chroma-js";

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

export const stripHexHash = (color: string) => {
  return color.replace("#", "");
};

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}
