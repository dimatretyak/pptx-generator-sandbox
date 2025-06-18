import pptxgen from "pptxgenjs";
import {
  PowerPointConfig,
  PowerPointLayoutConfig,
  PowerPointSlideConfig,
} from "../types/powerpoint.types";
import { normalizeBarsChartData } from "../utils/powerpoint/charts";
import { PowerPointLayout } from "./PowerPointLayout";

export type PowerPointBarChartDataEntity = {
  labels: string[];
  values: number[];
  name: string;
  color: string;
};

export type PowerPointBarChartPayload = PowerPointLayoutConfig & {
  data: PowerPointBarChartDataEntity[];
  lines?: Pick<PowerPointBarChartDataEntity, "values" | "name" | "color">[];
  labelFormatCode?: string;
};

export type PowerPointBarChartOptions = {
  normalizeData?: boolean;
};

export class PowerPointBarChart {
  private config: PowerPointConfig;
  private layout: PowerPointLayout;

  constructor(config: PowerPointConfig, layout: PowerPointLayout) {
    this.config = config;
    this.layout = layout;
  }

  render(
    slide: pptxgen.Slide,
    payload: PowerPointBarChartPayload,
    options: PowerPointBarChartOptions,
    slideConfig: PowerPointSlideConfig
  ) {
    const shouldRenderLines =
      Array.isArray(payload.lines) && payload.lines.length > 0;

    // Add background shape
    slide.addShape("roundRect", {
      x: slideConfig.x,
      y: slideConfig.y,
      w: slideConfig.width,
      h: slideConfig.height,
      rectRadius: this.config.roundess,
      line: {
        color: this.config.border.color,
        size: this.config.border.size,
      },
    });

    const chartOptions: pptxgen.IChartOpts = {
      x: slideConfig.x + this.config.spacer,
      y: slideConfig.y + this.config.spacer,
      w: slideConfig.width - 2 * this.config.spacer,
      h: slideConfig.height - 2 * this.config.spacer,
      barDir: "col",
      valAxisLabelFormatCode: payload.labelFormatCode,
      barGapWidthPct: 25,
      valGridLine: {
        style: "none",
      },
      showLegend: true,
      legendPos: "b",
      legendFontSize: 12,
      showValue: !shouldRenderLines,
      dataLabelFormatCode: payload.labelFormatCode,
    };

    let entities: pptxgen.IChartMulti[] = [
      {
        type: "bar",
        data: payload.data.map((entity) => {
          return {
            name: entity.name,
            values: entity.values,
            labels: entity.labels,
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

    if (options.normalizeData) {
      entities = normalizeBarsChartData(entities);
    }

    slide.addChart(
      entities,
      // @ts-expect-error
      chartOptions
    );
  }
}
