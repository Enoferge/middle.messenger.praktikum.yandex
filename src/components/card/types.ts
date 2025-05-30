import type { BaseContext, PageName } from '@/navigation/types';
import type { InputFieldProps } from '@/components/input/types';

export interface CardContext extends BaseContext {
  title: string;
  contentBlock?: string;
  footerBlock?: string;
  formFields: Array<InputFieldProps>;
  submitAction: {
    name: string;
    text: string;
  };
  secondaryAction: {
    name: string;
    text: string;
    page: PageName;
  };
}
