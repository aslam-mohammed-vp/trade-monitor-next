export interface Stock {
  isin: string;
  price: number;
  bid: number;
  ask: number;
}

export enum Operation {
  Subscribe = "subscribe",
  Unsubscribe = "unsubscribe",
}

export interface SubscriptionData {
  subscribeStocks: string[];
  unsubscribeStocks: string[];
}

export interface StockDataMap {
  [key: string]: Stock;
}

export interface HandlerFunctionType {
  (id: string, operation: Operation): void;
}
