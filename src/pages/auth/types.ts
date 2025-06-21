import type { FormFooterProps } from '@/components/form-footer/types';
import type { FormProps } from '@/components/form/types';
import type { Props } from '@/core/block/types';

export interface AuthPageProps extends Props {
  title: string;
  formId: string;
  formProps: Pick<FormProps, 'formFields' | 'formState' | 'onSubmit'>;
  footerProps: FormFooterProps;
}
