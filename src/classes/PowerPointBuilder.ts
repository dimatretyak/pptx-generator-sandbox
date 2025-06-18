import pptxgen from "pptxgenjs";
import { PowerPointConfig, PowerPointValue } from "../types/powerpoint.types";
import { isNumber, isString } from "../utils/common";
import { formatNumber, formatPercent } from "../utils/formatters";
import { PowerPointTable, PowerPointTablePayload } from ".//PowerPointTable";
import {
  PowerPointBarChart,
  PowerPointBarChartOptions,
  PowerPointBarChartPayload,
} from ".//PowerPointBarChart";
import { PowerPointLayout } from ".//PowerPointLayout";
import { PowerPointBoxes, PowerPointBoxesPayload } from ".//PowerPointBoxes";
import {
  PowerPointPieChart,
  PowerPointPieChartPayload,
} from "./PowerPointPieChart";

// 16:9 aspect ratio
const LAYOUT_NAME = "APP";
const SLIDE_WIDTH = 10;
const SLIDE_HEIGHT = 5.625;
const FALLBACK_POWER_POINT_VALUE = "-";

class PowerPointBuilder {
  private slideGenerators: Array<(slide: pptxgen.Slide) => void> = [];
  private presentation: pptxgen;
  private config: PowerPointConfig;
  private table: PowerPointTable;
  private boxes: PowerPointBoxes;
  private layout: PowerPointLayout;

  private charts: {
    pie: PowerPointPieChart;
    bar: PowerPointBarChart;
  };

  static formatNumber(value: PowerPointValue): string {
    if (isNumber(value)) {
      return formatNumber(value);
    }

    if (isString(value)) {
      return value;
    }

    return FALLBACK_POWER_POINT_VALUE;
  }

  static formatPercent(value: PowerPointValue): string {
    if (isNumber(value)) {
      return formatPercent(value);
    }

    if (isString(value)) {
      return value;
    }

    return FALLBACK_POWER_POINT_VALUE;
  }

  constructor() {
    this.presentation = new pptxgen();

    this.config = {
      border: {
        size: 1,
        color: "cccccc",
      },
      roundess: 0.025,
      margin: {
        top: 0.25,
        left: 0.25,
        right: 0.25,
        bottom: 0.25,
      },
      slide: {
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
      },
      spacer: 0.25,
    };

    this.layout = new PowerPointLayout(this.config);

    this.presentation.defineLayout({
      name: LAYOUT_NAME,
      width: this.config.slide.width,
      height: this.config.slide.height,
    });

    this.presentation.layout = LAYOUT_NAME;

    this.table = new PowerPointTable(this.config, this.layout);
    this.boxes = new PowerPointBoxes(this.config, this.layout);

    this.charts = {
      bar: new PowerPointBarChart(this.config, this.layout),
      pie: new PowerPointPieChart(this.config, this.layout),
    };
  }

  addBoxesSlide(payload: PowerPointBoxesPayload) {
    this.slideGenerators.push((slide) => {
      this.boxes.render(slide, payload);
    });

    return this;
  }

  addTableSlide(payload: PowerPointTablePayload) {
    const { width, height } = this.layout.getSlideSizes(payload.markup);

    this.slideGenerators.push((slide) => {
      this.table.render(slide, payload, {
        width,
        height,
      });
    });

    return this;
  }

  addBarChartSlide(
    payload: PowerPointBarChartPayload,
    options: PowerPointBarChartOptions = {}
  ) {
    const { width, height } = this.layout.getSlideSizes(payload.markup);

    this.slideGenerators.push((slide) => {
      this.charts.bar.render(slide, payload, options, {
        width,
        height,
      });
    });

    return this;
  }

  addPieChartSlide(payload: PowerPointPieChartPayload) {
    const { width, height } = this.layout.getSlideSizes(payload.markup);

    this.slideGenerators.push((slide) => {
      this.charts.pie.render(slide, payload, {
        width,
        height,
      });
    });

    return this;
  }

  buildAndSave(fileName: string) {
    for (const generateSlide of this.slideGenerators) {
      const slide = this.presentation.addSlide();
      generateSlide(slide);
    }

    this.presentation.writeFile({ fileName });
  }
}

export default PowerPointBuilder;
