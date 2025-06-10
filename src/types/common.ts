export type TableCellEntityValue = string | number | undefined;
export type Formatter = (value: TableCellEntityValue) => string;

export type Card = {
  title: string;
  value: TableCellEntityValue;
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

export type TableCellEntity = {
  value: TableCellEntityValue;
  format?: Formatter;
};
