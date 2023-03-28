export type Item = {
  name: ItemId;
  sellingPrice: number;
  costPrice: number;
  grouping: string;
  salesFigure: number;
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
  date: string;
};

export type History = {
  id: number;
  name: string;
  item: string;
  price: number;
  date: string;
};

export type LabeledHistory = {
  [label: string]: number;
};

export type ItemId =
  | "CocaCola"
  | "Fanta"
  | "Water"
  | "GogoTea"
  | "PotatoChips"
  | "Dagashi";

export type LogoDictionary = Record<ItemId, string>;
