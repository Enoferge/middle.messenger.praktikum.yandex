import type { PageName } from '../../navigation/types';
import type { InputField } from '../input/types';

export interface CardContext {
  title: string;
  contentBlock?: string;
  footerBlock?: string;
  formId: string;
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
