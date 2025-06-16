export type PowerPointValue = string | number | undefined;
export type Formatter = (value: PowerPointValue) => string;

export type Card = {
  title: string;
  value: PowerPointValue;
  format?: Formatter;
};

export type TableHeaderEntity = {
  text: string;
  heatMap?: {
    colorPalette: [string, string];
    maxValue: number;
    minValue: number;
  };
};

export type PowerPointTableCellEntity = {
  value: PowerPointValue;
  format?: Formatter;
};

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
};
