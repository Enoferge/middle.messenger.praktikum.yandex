import type { RawPropsWithChildren } from '@/core/block/types';
import type { LinkProps } from '../link/types';

interface Action {
  name: string;
  text: string;
  onClick?: (e: Event) => void;
}

interface SubmitAction extends Action {
  formId?: string;
}

export interface FormFooterProps extends RawPropsWithChildren {
  submitAction: SubmitAction;
  secondaryAction?: LinkProps;
}
