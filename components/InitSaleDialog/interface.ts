export interface IProps {
  open: boolean;
  onClose: () => void
}

export interface ILabel {
  optional?: any;
}

export interface IStep {
  completed?: boolean;
}