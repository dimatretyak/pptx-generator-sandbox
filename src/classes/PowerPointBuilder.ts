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
import path from "node:path";
import { config } from "../config";
import { isNumber, isString } from "../utils/common";

// 16:9 aspect ratio
const LAYOUT_NAME = "APP";
const SLIDE_WIDTH = 10;
const SLIDE_HEIGHT = 5.625;

type Size = {
  height: number;
};

type PowerPointMultipleEntity =
  | {
      type: "pie";
      title: string;
      size?: Size;
      payload: PowerPointPieChartPayload;
    }
  | {
      type: "bar";
      title: string;
      size?: Size;
      payload: PowerPointBarChartPayload;
    }
  | {
      type: "boxes";
      title: string;
      size?: Size;
      payload: PowerPointInfoBlockPayload;
    }
  | {
      type: "circles";
      title: string;
      size?: Size;
      payload: PowerPointInfoBlockPayload;
    }
  | {
      type: "table";
      title: string;
      size?: Size;
      payload: PowerPointTablePayload;
    };

type MultipleData = {
  size?: {
    height: number | string;
  };
  entities: PowerPointMultipleEntity[];
}[];

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
      debug: true,
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

  private parseSizeNumber(value: string | number | undefined, height: number) {
    if (isNumber(value)) {
      return value;
    }

    if (isString(value)) {
      const percent = parseFloat(value);
      const result = (height * percent) / 100;

      return result;
    }

    return null;
  }

  private calculateRowHeight(data: MultipleData, height: number) {
    const totalSpacersHeight = this.config.spacer * (data.length - 1);

    const info = data.reduce(
      (acc, cur) => {
        const result = this.parseSizeNumber(cur.size?.height, height);

        if (result !== null) {
          acc.count.custom += 1;
          acc.height.custom += result;
          acc.height.default -= result;
        } else {
          acc.count.default += 1;
        }

        return acc;
      },
      {
        height: {
          custom: 0,
          default: 0,
        },
        count: {
          custom: 0,
          default: 0,
        },
      }
    );

    const fallbackHeight =
      (height - info.height.custom - totalSpacersHeight) / info.count.default;

    return fallbackHeight;
  }

  addMultipleToSlide(data: MultipleData, options: PowerPointSlideOptions) {
    this.slideGenerators.push((slide) => {
      this.addMarkup(slide, options);

      const sizes = this.layout.getSlideSizes(options);
      const coords = this.layout.getContentCoords(options);
      const fallbackHeight = this.calculateRowHeight(data, sizes.height);

      if (fallbackHeight < 0.4) {
        throw new Error(
          "The total size of the custom height is greater than the allowed height"
        );
      }

      const heightPerRow = data.reduce(
        (acc, row, index) => {
          const parsedHeight = this.parseSizeNumber(
            row.size?.height,
            sizes.height
          );
          const height = parsedHeight ?? fallbackHeight;
          const prevRow = acc[index - 1];
          let y = coords.y;

          if (prevRow) {
            y = prevRow.y + prevRow.height + this.config.spacer;
          }

          acc.push({
            height,
            y,
          });

          return acc;
        },
        [] as {
          height: number;
          y: number;
        }[]
      );

      data.forEach((row, rowIndex) => {
        row.entities.forEach((col, colIndex) => {
          const info = this.layout.getCardSizeByRowCol({
            rowIndex,
            colIndex,
            rowsCount: row.entities.length,
            colsCount: data.length,
            sizes,
            coords,
          });

          const entity = heightPerRow[rowIndex];

          const slideConfig: PowerPointSlideConfig = {
            width: info.width,
            height: entity.height - SLIDE_TITLE_FULL_HEIGHT,
            x: info.x,
            y: entity.y + SLIDE_TITLE_FULL_HEIGHT,
          };

          if (this.config.debug) {
            slide.addShape("rect", {
              x: slideConfig.x,
              y: slideConfig.y,
              w: slideConfig.width,
              h: slideConfig.height,
              line: {
                color: "FF0000",
                size: this.config.border.size,
              },
            });
          }

          this.layout.renderContentTitle(slide, col.title, {
            width: info.width,
            x: info.x,
            y: entity.y,
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
      slide.addImage({
        w: this.config.slide.width,
        h: this.config.slide.height,
        x: 0,
        y: 0,
        path: path.join(config.path.images, "master-slide-bg.svg"),
      });

      slide.addText(title, {
        x: 0,
        y: 0,
        w: this.config.slide.width,
        h: this.config.slide.height,
        align: "center",
        rectRadius: this.config.roundess,
        fontSize: 30,
        bold: true,
        color: "ffffff",
      });
    });
  }

  buildAndSave(fileName: string) {
    for (const generateSlide of this.slideGenerators) {
      try {
        const slide = this.presentation.addSlide();
        generateSlide(slide);
      } catch (error) {
        console.log("[buildAndSave]", error);
      }
    }

    this.presentation.writeFile({ fileName });
  }
}

export default PowerPointBuilder;
