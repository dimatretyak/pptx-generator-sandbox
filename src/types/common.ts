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

export type TableCellEntity = {
  value: string | number;
};
