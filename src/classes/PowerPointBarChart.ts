import pptxgen from "pptxgenjs";
import {
  PowerPointConfig,
  PowerPointLayoutConfig,
  SlideConfig,
} from "../types/common";
import { normalizeBarsChartData } from "../utils/charts";
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
    slideConfig: SlideConfig
  ) {
    this.layout.renderSlideMarkup(slide, {
      markup: payload.markup,
    });

    const coords = this.layout.getContentCoords(payload.markup);
    const shouldRenderLines =
      Array.isArray(payload.lines) && payload.lines.length > 0;

    // Add background shape
    slide.addShape("roundRect", {
      x: coords.x,
      y: coords.y,
      w: slideConfig.width,
      h: slideConfig.height,
      rectRadius: this.config.roundess,
      line: {
        color: this.config.border.color,
        size: this.config.border.size,
      },
    });

    const chartOptions: pptxgen.IChartOpts = {
      x: coords.x + this.config.spacer,
      y: coords.y + this.config.spacer,
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
      const lines = payload.lines!;

      entities.push({
        type: "line",
        data: lines.map((entity) => {
          return {
            name: entity.name,
            values: entity.values,
            labels: [],
          };
        }),
        options: {
          chartColors: lines.map((entity) => entity.color),
          showValue: false,
        },
      });
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
