export type Item = {
  name: string;
  sellingprice: number;
  costprice: number;
  grouping: string;
  salesfigure: number;
  active: boolean;
};

export type Member = {
  name: string;
  displayName: string;
  umpayedAmount: number;
  attribute: string;
  active: boolean;
};

export type Chat = {
  id: number;
  message: string;
  date: Date;
};

export type History = {
  id: number;
  name: string;
  item: string;
  price: number;
  date: Date;
};

export type LabeledHistory = {
  [label: string]: number;
};
