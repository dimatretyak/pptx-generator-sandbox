import { isNumber, isString } from "./common";
import {
  PowerPointValue,
  PowerPointValueFormatter,
} from "../types/powerpoint.types";
import { DateTime } from "luxon";

export const FALLBACK_POWERPOINT_VALUE = "-";

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
  options: {
    formatter?: PowerPointValueFormatter;
    compactNumber?: boolean;
  } = {}
): string => {
  if (typeof options.formatter === "function") {
    return options.formatter(value);
  }

  if (isNumber(value) && (options.compactNumber ?? true)) {
    return formatNumberWithSuffix(value);
  }

  if (isNumber(value)) {
    return formatNumber(value);
  }

  if (isString(value)) {
    return value;
  }

  return FALLBACK_POWERPOINT_VALUE;
};

export const formateFooterDate = (date: Date) => {
  const d = DateTime.fromJSDate(date);
  const formatted = d.toFormat("MM/dd/yyyy");

  return formatted;
};
