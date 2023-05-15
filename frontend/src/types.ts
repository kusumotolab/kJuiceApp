export type Item = {
  id: ItemId;
  name: string;
  sellingPrice: number;
  costPrice: number;
  category: string;
  active: boolean;
};

export type Member = {
  id: string;
  name: string;
  attribute: string;
  active: boolean;
};

export type Chat = {
  id: number;
  message: string;
  date: string;
};

export type History = {
  historyId: number;
  memberId: string;
  memberName: string;
  itemId: string;
  itemName: string;
  price: number;
  date: string;
};

export type Bill = {
  billId: number;
  issuerId: string;
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
