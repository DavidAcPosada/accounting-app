export interface INewEventDialog {
  open: boolean;
  onClose: () => void;
}

interface IPrices {
  product: any;
  price: number;
}

export interface IInitialValues {
  name: string;
  prices: Array<IPrices>;
}