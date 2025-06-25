import pptxgen from "pptxgenjs";
import {
  PowerPointConfig,
  PowerPointSlideConfig,
  PowerPointSlideOptions,
} from "../types/powerpoint.types";
import { PowerPointTable, PowerPointTablePayload } from "./PowerPointTable";
import {
  PowerPointBarChart,
  PowerPointBarChartPayload,
} from "./PowerPointBarChart";
import { PowerPointLayout, SLIDE_TITLE_FULL_HEIGHT } from "./PowerPointLayout";
import {
  PowerPointInfoBlocks,
  PowerPointInfoBlockPayload,
} from "./PowerPointInfoBlocks";
import {
  PowerPointPieChart,
  PowerPointPieChartPayload,
} from "./PowerPointPieChart";

// 16:9 aspect ratio
const LAYOUT_NAME = "APP";
const SLIDE_WIDTH = 10;
const SLIDE_HEIGHT = 5.625;

type PowerPointMultipleEntity =
  | {
      type: "pie";
      title: string;
      payload: PowerPointPieChartPayload;
    }
  | {
      type: "bar";
      title: string;
      payload: PowerPointBarChartPayload;
    }
  | {
      type: "boxes";
      title: string;
      payload: PowerPointInfoBlockPayload;
    }
  | {
      type: "circles";
      title: string;
      payload: PowerPointInfoBlockPayload;
    }
  | {
      type: "table";
      title: string;
      payload: PowerPointTablePayload;
    };

class PowerPointBuilder {
  private slideGenerators: Array<(slide: pptxgen.Slide) => void> = [];
  private presentation: pptxgen;
  private config: PowerPointConfig;
  private table: PowerPointTable;
  private infoBlock: PowerPointInfoBlocks;
  private layout: PowerPointLayout;

  private charts: {
    pie: PowerPointPieChart;
    bar: PowerPointBarChart;
  };

  constructor() {
    this.presentation = new pptxgen();

    this.config = {
      border: {
        size: 1,
        color: "e0e0e0",
      },
      roundess: 0.025,
      margin: {
        top: 0.15,
        left: 0.15,
        right: 0.15,
        bottom: 0.15,
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

    this.table = new PowerPointTable(this.config);
    this.infoBlock = new PowerPointInfoBlocks(this.config, this.layout);

    this.charts = {
      bar: new PowerPointBarChart(),
      pie: new PowerPointPieChart(),
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
    payload: PowerPointInfoBlockPayload,
    options: PowerPointSlideOptions
  ) {
    this.slideGenerators.push((slide) => {
      const config = this.addMarkup(slide, options);

      this.infoBlock.renderRoundedRectangles(slide, payload, config);
    });

    return this;
  }

  addCirclesSlide(
    payload: PowerPointInfoBlockPayload,
    options: PowerPointSlideOptions
  ) {
    this.slideGenerators.push((slide) => {
      const config = this.addMarkup(slide, options);

      this.infoBlock.renderCircles(slide, payload, config);
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
            height: info.height - SLIDE_TITLE_FULL_HEIGHT,
            x: info.x,
            y: info.y + SLIDE_TITLE_FULL_HEIGHT,
          };

          this.layout.renderContentTitle(slide, col.title, {
            width: info.width,
            x: info.x,
            y: info.y,
          });

          if (col.type === "pie") {
            this.charts.pie.render(slide, col.payload, slideConfig);
          }

          if (col.type === "bar") {
            this.charts.bar.render(slide, col.payload, slideConfig);
          }

          if (col.type === "boxes") {
            this.infoBlock.renderRoundedRectangles(
              slide,
              col.payload,
              slideConfig
            );
          }

          if (col.type === "circles") {
            this.infoBlock.renderCircles(slide, col.payload, slideConfig);
          }

          if (col.type === "table") {
            this.table.render(slide, col.payload, slideConfig);
          }
        });
      });
    });

    return this;
  }

  addMasterSlide(title: string) {
    this.slideGenerators.push((slide) => {
      slide.addText(title, {
        x: 0,
        y: 0,
        w: this.config.slide.width,
        h: this.config.slide.height,
        align: "center",
        rectRadius: this.config.roundess,
        line: {
          color: this.config.border.color,
          size: this.config.border.size,
        },
      });
    });
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
