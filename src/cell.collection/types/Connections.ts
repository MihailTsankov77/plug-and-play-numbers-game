export type Connection = {
  from: string;
  to: string;
};

export type PossibleConnection = Connection & {
  direction: "horizontal" | "vertical";
};

export type ConnectionEvent = Connection & {
  delete?: boolean;
};
