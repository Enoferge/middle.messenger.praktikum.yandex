export type FormFooterProps = {
  submitAction: SubmitAction;
  secondaryAction?: Action;
};

interface Action {
  name: string;
  text: string;
  onClick?: (e: Event) => void;
}

interface SubmitAction extends Action {
  formId?: string;
}
