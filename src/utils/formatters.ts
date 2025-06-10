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

  // Преобразуем из 0–100 в 0–1
  return formatter.format(value / 100);
};
