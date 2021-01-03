interface IEstablishment {
  active: boolean;
  id: string;
  name: string;
}

interface IEstablishmentStore {
  establishments: Array<IEstablishment>;
  active: IEstablishment;
}

export interface IStore {
  establishments: IEstablishmentStore;
  ui: {
    initSale: {
      disableControls: boolean;
    }
  }
}