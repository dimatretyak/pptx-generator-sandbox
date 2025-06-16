import pptxgen from "pptxgenjs";
import { PowerPointChartDataEntity } from "../types/common";
import { normalizeBarsChartData } from "../utils/charts";

export class PowerPointBarChart {
  private config: {
    margin: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    };
    borderSize: number;
    roundess: number;
  };

  constructor(config: {
    margin: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    };
    borderSize: number;
    roundess: number;
  }) {
    this.config = config;
  }

  render(
    slide: pptxgen.Slide,
    payload: {
      title: string;
      data: PowerPointChartDataEntity[];
      lines?: Pick<PowerPointChartDataEntity, "values" | "name" | "color">[];
      labelFormatCode?: string;
    },
    options: {
      normalizeData?: boolean;
      width: number;
      height: number;
    }
  ) {
    const PADDING = 0.25;
    const shouldRenderLines =
      Array.isArray(payload.lines) && payload.lines.length > 0;

    // Add title
    slide.addText(payload.title, {
      x: this.config.margin.left,
      y: 0,
      h: this.config.margin.top,
      valign: "middle",
      bold: true,
      fontSize: 18,
      margin: 0,
      w: options.width,
    });

    // Add background shape
    slide.addShape("roundRect", {
      x: this.config.margin.left,
      y: this.config.margin.top,
      w: options.width,
      h: options.height,
      rectRadius: this.config.roundess,
      line: {
        color: "cccccc",
        size: this.config.borderSize,
      },
    });

    const chartOptions: pptxgen.IChartOpts = {
      x: this.config.margin.left + PADDING,
      y: this.config.margin.top + PADDING,
      w: options.width - 2 * PADDING,
      h: options.height - 2 * PADDING,
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
