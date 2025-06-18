import pptxgen from "pptxgenjs";
import {
  PowerPointConfig,
  PowerPointSlideConfig,
} from "../types/powerpoint.types";
import { PowerPointLayout } from "./PowerPointLayout";

export type PowerPointPieChartData = {
  name: string;
  labels: string[];
  values: number[];
  colors: string[];
};

export type PowerPointPieChartPayload = {
  data: PowerPointPieChartData;
};

export class PowerPointPieChart {
  private config: PowerPointConfig;
  private layout: PowerPointLayout;

  constructor(config: PowerPointConfig, layout: PowerPointLayout) {
    this.config = config;
    this.layout = layout;
  }

  render(
    slide: pptxgen.Slide,
    payload: PowerPointPieChartPayload,
    slideConfig: PowerPointSlideConfig
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
        x: slideConfig.x,
        y: slideConfig.y,
        w: slideConfig.width,
        h: slideConfig.height,
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
