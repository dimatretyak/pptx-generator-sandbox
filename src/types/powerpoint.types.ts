export type PowerPointValue = string | number | undefined;
export type PowerPointValueFormatter = (value: PowerPointValue) => string;

export type PowerPointChartDataEntity = {
  labels: string[];
  values: number[];
  name: string;
  color: string;
};

export type PowerPointPieChartData = {
  name: string;
  labels: string[];
  values: number[];
  colors: string[];
};

export type PowerPointConfig = {
  margin: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  border: {
    size: number;
    color: string;
  };
  roundess: number;
  slide: {
    width: number;
    height: number;
  };
  spacer: number;
};

export type PowerPointSlideConfig = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type PowerPointMarkup = {
  contentVerticalOffset?: number;
  text: {
    header: string;
    content?: string;
    footer: string;
  };
};

export type PowerPointSlideOptions = {
  markup: PowerPointMarkup;
};
