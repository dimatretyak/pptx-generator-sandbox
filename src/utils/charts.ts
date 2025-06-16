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

export function normalizeBarsChartData(
  data: pptxgen.IChartMulti[]
): pptxgen.IChartMulti[] {
  const info = getMaxValuesInfo(data);

  const results = data.map((dataEntity, index) => {
    return {
      ...dataEntity,
      data: dataEntity.data.map((entity, entityIndex) => {
        const offset = index + entityIndex;
        const values = entity.values ?? [];
        const scale = info.max / info.maxByArray[offset];

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
