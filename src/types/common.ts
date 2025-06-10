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
