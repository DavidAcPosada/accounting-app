export interface ILoader {
  open: boolean;
  children?: any;
  size?: number;
  opacity?: number;
  type?: 'READY' | 'LOADING'
}