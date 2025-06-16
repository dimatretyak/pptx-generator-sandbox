import { PowerPointConfig } from "../types/common";

export class PowerPointLayout {
  private config: PowerPointConfig;

  constructor(config: PowerPointConfig) {
    this.config = config;
  }

  getSlideSizes() {
    const horizontal = this.config.margin.left - this.config.margin.right;
    const vertical = this.config.margin.top - this.config.margin.bottom;

    return {
      width: this.config.slide.width - horizontal,
      height: this.config.slide.height - vertical,
    };
  }
}
