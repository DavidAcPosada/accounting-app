export interface ISalesProduct {
  buy: number;
  final: number;
  money: number;
  product: any;
  shells: number;
  wear: number;
}

export interface ISales {
  id?: string;
  date: any;
  establishment?: any;
  total: number;
  state: 'PROCCESS' | 'FINISHED' | 'CANCELED' | 'PAUSED';
  sales: Array<ISalesProduct>;
}

export interface ISalesScreen {
  screen: 'new' | 'details' | undefined | string | string[];
}

export interface IStates {
  PROCCESS: any;
  FINISHED: any;
  CANCELED: any;
  PAUSED: any;
}