export interface ISetupPrices {
  events: Array<any>;
  eventSelected: any;
  handleChangeEventSeleted: (values: any) => void;
  selection: number;
  setSelection: (prev: any) => void;
  discount: IDiscount;
  setDiscount: (prev: (e: IDiscount) => IDiscount) => void;
}

export interface IDiscount {
  all: {
    is: boolean;
    value: number;
  };
  some: {
    is: boolean;
    values: Array<IDiscountValue>
  };
}

export interface IDiscountValue {
  id: string;
  value: number;
}

export interface IEventList {
  events: Array<any>;
  close: () => void;
  eventSelected: any;
  handleChangeEventSeleted: (values: any) => void;
  handleDisabledButton: (value: boolean) => void;
}

export interface IDiscountComponent {
  discount: IDiscount;
  setDiscount: (prev: (e: IDiscount) => IDiscount) => void;
  close: (event: any) => void;
}