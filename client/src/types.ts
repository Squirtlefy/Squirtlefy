export type Card = {
  name: string;
  people: string[];
};

export type List = {
  name: string;
  cards: Card[];
};

export type BoardType = {
  name: string;
  boardId: number;
  lists: List[];
};
