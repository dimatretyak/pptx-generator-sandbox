export type Card = {
  title: string;
  value: string;
};

export type TableHeaderEntity = {
  text: string;
  heatMap?: {
    colorPalette: [string, string];
    maxValue: number;
    minValue: number;
  };
};

export type TableCellEntityValue = string | number | undefined;

export type TableCellEntity = {
  value: TableCellEntityValue;
  format?: (value: TableCellEntityValue) => string;
};
