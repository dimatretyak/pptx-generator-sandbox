import { isNumber } from "./common";
import { PowerPointValue } from "../types/common";

export const formatNumber = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};

export const formatPercent = (
  value: number,
  options: Omit<Intl.NumberFormatOptions, "style"> = {}
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    ...options,
    style: "percent",
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
    useGrouping: options.useGrouping ?? true,
  });

  return formatter.format(value / 100);
};

// TODO: Reuse this function from Lumina in the future
export function formatNumberWithSuffix(value: unknown) {
  if (isNumber(value)) {
    if (value % 1 !== 0) {
      return `${value.toFixed(2)}%`;
    }

    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }

    if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }

    if (value >= 10) {
      return value.toFixed(0);
    }

    return value.toString();
  }

  if (value) {
    return value.toString();
  }

  return "";
}

export const formatValue = (
  value: PowerPointValue,
  formatter?: (value: PowerPointValue) => string
): string => {
  if (typeof formatter === "function") {
    return formatter(value);
  }

  if (typeof value === "number") {
    return value.toString();
  }

  if (typeof value === "string") {
    return value;
  }

  return "-";
};
