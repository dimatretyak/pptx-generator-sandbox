export type PowerPointValue = string | number | undefined;
export type Formatter = (value: PowerPointValue) => string;

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
  borderSize: number;
  roundess: number;
  slide: {
    width: number;
    height: number;
  };
  spacer: number;
};

export type SlideConfig = {
  width: number;
  height: number;
};
