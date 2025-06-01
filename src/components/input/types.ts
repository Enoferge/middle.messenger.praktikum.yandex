export interface InputProps extends InputAttrs {
  onChange?: (e: InputEvent) => void;
  onBlur?: (e: InputEvent) => void;
  onFocus?: (e: InputEvent) => void;
}

export interface InputAttrs {
  class?: string; // TODO: move to blockAttrs
  name: string;
  value?: string;
  type: string;
  minlength?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  autocomplete?: boolean;
}
