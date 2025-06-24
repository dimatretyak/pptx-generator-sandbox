import pptxgen from "pptxgenjs";
import { PowerPointSlideConfig } from "../types/powerpoint.types";
import { normalizeBarsChartData } from "../utils/powerpoint/charts";
import { preparePercentageValues } from "../utils/common";

const TEXT_FONT_SIZE = 10;
const TEXT_COLOR = "666666";
const TEXT_VALUE_COLOR = "000000";

export type PowerPointBarChartDataEntity = {
  labels?: string[];
  values: number[];
  name: string;
  color: string;
};

export type PowerPointBarChartPayload = {
  data: PowerPointBarChartDataEntity[];
  lines?: Pick<PowerPointBarChartDataEntity, "values" | "name" | "color">[];
  labelFormatCode?: string;
  normalizeData?: boolean;
};

export class PowerPointBarChart {
  render(
    slide: pptxgen.Slide,
    payload: PowerPointBarChartPayload,
    slideConfig: PowerPointSlideConfig
  ) {
    const shouldRenderLines =
      Array.isArray(payload.lines) && payload.lines.length > 0;

    const chartOptions: pptxgen.IChartOpts = {
      x: slideConfig.x,
      y: slideConfig.y,
      w: slideConfig.width,
      h: slideConfig.height,
      barDir: "col",
      valAxisLabelFormatCode: payload.labelFormatCode,
      barGapWidthPct: 25,
      valGridLine: {
        style: "none",
      },
      showLegend: true,
      legendPos: "b",
      legendFontSize: TEXT_FONT_SIZE,
      legendColor: TEXT_VALUE_COLOR,
      showValue: !shouldRenderLines,
      dataLabelFormatCode: payload.labelFormatCode,
      dataLabelFontSize: TEXT_FONT_SIZE,
      catAxisLabelFontSize: TEXT_FONT_SIZE,
      catAxisLabelColor: TEXT_COLOR,
      valAxisLabelFontSize: TEXT_FONT_SIZE,
      valAxisLabelColor: TEXT_COLOR,
    };

    let entities: pptxgen.IChartMulti[] = [
      {
        type: "bar",
        data: payload.data.map((entity) => {
          return {
            name: entity.name,
            values: entity.values,
            labels: entity.labels ?? [],
          };
        }),
        options: {
          chartColors: payload.data.map((entity) => entity.color),
        },
      },
    ];

    if (shouldRenderLines) {
      // IMPORTANT: Each line series is added separately to ensure marker (dot) colors match the line color.
      // pptxgenjs may ignore `chartColors` for line markers when multiple series are grouped in a single `data` array.
      // Adding each line as a separate chart entity ensures consistent coloring for both lines and markers.
      for (const entity of payload.lines!) {
        entities.push({
          type: "line",
          data: [
            {
              name: entity.name,
              values: entity.values,
              labels: [],
            },
          ],
          options: {
            chartColors: [entity.color],
            showValue: false,
          },
        });
      }
    }

    // The values are in decimal format (e.g., 0.75 = 75%)
    if (payload.labelFormatCode?.includes("%")) {
      entities.forEach((entity) => {
        entity.data.forEach((dataEntity) => {
          dataEntity.values = preparePercentageValues(dataEntity.values!);
        });
      });
    }

    if (payload.normalizeData) {
      entities = normalizeBarsChartData(entities);
    }

    slide.addChart(
      entities,
      // @ts-expect-error
      chartOptions
    );
  }
}
