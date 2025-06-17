import pptxgen from "pptxgenjs";
import { PowerPointConfig, SlideConfig } from "../types/common";

export type PowerPointPieChartData = {
  name: string;
  labels: string[];
  values: number[];
  colors: string[];
};

export type PowerPointPieChartPayload = {
  title: string;
  data: PowerPointPieChartData;
};

export class PowerPointPieChart {
  private config: PowerPointConfig;

  constructor(config: PowerPointConfig) {
    this.config = config;
  }

  render(
    slide: pptxgen.Slide,
    payload: PowerPointPieChartPayload,
    slideConfig: SlideConfig
  ) {
    const labels = payload.data.labels.map((label, index) => {
      return `${label} - ${payload.data.values[index]}`;
    });

    const colors = payload.data.values.map(
      (_value, index) => payload.data.colors[index % payload.data.colors.length]
    );

    slide.addChart(
      "pie",
      [
        {
          name: payload.data.name,
          labels: labels,
          values: payload.data.values,
        },
      ],
      {
        x: this.config.margin.left + this.config.spacer,
        y: this.config.margin.top + this.config.spacer,
        w: slideConfig.width - 2 * this.config.spacer,
        h: slideConfig.height - 2 * this.config.spacer,
        chartColors: colors,
        dataBorder: {
          pt: 2,
          color: "ffffff",
        },
        legendPos: "r",
        showLegend: true,
        showLeaderLines: true,
        showValue: false,
      }
    );
  }
}
