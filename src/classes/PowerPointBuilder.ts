import pptxgen from "pptxgenjs";
import {
  PowerPointConfig,
  PowerPointSlideConfig,
  PowerPointSlideOptions,
  PowerPointValue,
} from "../types/powerpoint.types";
import { isNumber, isString } from "../utils/common";
import { formatNumber, formatPercent } from "../utils/formatters";
import { PowerPointTable, PowerPointTablePayload } from ".//PowerPointTable";
import {
  PowerPointBarChart,
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

type PowerPointMultipleEntity =
  | {
      type: "pie";
      payload: PowerPointPieChartPayload;
    }
  | {
      type: "bar";
      payload: PowerPointBarChartPayload;
    }
  | {
      type: "boxes";
      payload: PowerPointBoxesPayload;
    };

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

  addMarkup(
    slide: pptxgen.Slide,
    options: PowerPointSlideOptions
  ): PowerPointSlideConfig {
    const { width, height } = this.layout.getSlideSizes(options);
    const coords = this.layout.getContentCoords(options);

    this.layout.renderSlideMarkup(slide, options);

    return {
      width,
      height,
      x: coords.x,
      y: coords.y,
    };
  }

  addBoxesSlide(
    payload: PowerPointBoxesPayload,
    options: PowerPointSlideOptions
  ) {
    this.slideGenerators.push((slide) => {
      const config = this.addMarkup(slide, options);

      this.boxes.render(slide, payload, config);
    });

    return this;
  }

  addTableSlide(
    payload: PowerPointTablePayload,
    options: PowerPointSlideOptions
  ) {
    this.slideGenerators.push((slide) => {
      const config = this.addMarkup(slide, options);

      this.table.render(slide, payload, config);
    });

    return this;
  }

  addBarChartSlide(
    payload: PowerPointBarChartPayload,
    options: PowerPointSlideOptions
  ) {
    this.slideGenerators.push((slide) => {
      const config = this.addMarkup(slide, options);

      this.charts.bar.render(slide, payload, config);
    });

    return this;
  }

  addPieChartSlide(
    payload: PowerPointPieChartPayload,
    options: PowerPointSlideOptions
  ) {
    this.slideGenerators.push((slide) => {
      const config = this.addMarkup(slide, options);

      this.charts.pie.render(slide, payload, config);
    });

    return this;
  }

  addMultipleToSlide(
    entities: PowerPointMultipleEntity[][],
    options: PowerPointSlideOptions
  ) {
    this.slideGenerators.push((slide) => {
      this.addMarkup(slide, options);

      const sizes = this.layout.getSlideSizes(options);
      const coords = this.layout.getContentCoords(options);

      entities.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          const info = this.layout.getCardSizeByRowCol({
            rowIndex,
            colIndex,
            rowsCount: row.length,
            colsCount: entities.length,
            sizes,
            coords,
          });

          const slideConfig: PowerPointSlideConfig = {
            width: info.width,
            height: info.height,
            x: info.x,
            y: info.y,
          };

          if (col.type === "pie") {
            this.charts.pie.render(slide, col.payload, slideConfig);
          }

          if (col.type === "bar") {
            this.charts.bar.render(slide, col.payload, slideConfig);
          }

          if (col.type === "boxes") {
            this.boxes.render(slide, col.payload, slideConfig);
          }
        });
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
