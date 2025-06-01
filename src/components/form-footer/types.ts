import type { RawPropsWithChildren } from '@/core/block/types';

export interface FormFooterProps extends RawPropsWithChildren {
  submitAction: SubmitAction;
  secondaryAction?: Action;
}

interface Action {
  name: string;
  text: string;
  onClick?: (e: Event) => void;
}

interface SubmitAction extends Action {
  formId?: string;
}
