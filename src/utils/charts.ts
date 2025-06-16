import pptxgen from "pptxgenjs";

const getAllValues = (data: pptxgen.IChartMulti[]) => {
  return data.flatMap((item) => {
    return item.data.map((entity) => entity.values ?? []);
  });
};

const getMaxValuesInfo = (data: pptxgen.IChartMulti[]) => {
  const allValues = getAllValues(data);
  const maxValues = allValues.map((values) => Math.max(...values));
  const maxValue = Math.max(...maxValues);

  return {
    max: maxValue,
    maxByArray: maxValues,
  };
};

/**
 *
 * Scale all data series to bring them into a similar visual range for the chart.
 * So when data series have vastly different magnitudes (e.g. thousands vs millions),
 * smaller values appear flattened near the X axis.
 *
 * Approach:
 * - Determine the global min and max across all series
 * - Calculate a scale factor for each series based on its max value relative to a chosen target range
 * - Apply the scale factor to each value to normalize for display
 * - Use data labels to show the original (unscaled) values
 */
export function normalizeBarsChartData(
  data: pptxgen.IChartMulti[]
): pptxgen.IChartMulti[] {
  const info = getMaxValuesInfo(data);

  // Create a global index to ensure
  // unique scaling across all entities
  let globalIndex = 0;

  const results = data.map((dataEntity) => {
    return {
      ...dataEntity,
      data: dataEntity.data.map((entity) => {
        const values = entity.values ?? [];
        const scale = info.max / info.maxByArray[globalIndex];

        // Increment the global index for the next entity
        globalIndex++;

        return {
          ...entity,
          values: values.map((value) => {
            return value * scale;
          }),
        };
      }),
    };
  });

  return results;
}
