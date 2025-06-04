import type { BaseContext, PageName } from '../../navigation/types';
import type { InputField } from '../input/types';

export interface CardContext extends BaseContext {
  title: string;
  contentBlock?: string;
  footerBlock?: string;
  formFields: Array<InputField>;
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
