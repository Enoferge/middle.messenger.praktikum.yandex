import type { BaseContext, PageName } from '@/navigation/types';
import type { Block } from '@/core/block/block';
import type { RawPropsWithChildren } from '@/core/block/types';
import type { InputFieldProps } from '@/components/input-field/types';

export interface CardProps extends RawPropsWithChildren {
  title: string;
  children: {
    ContentBlock: Block;
    FooterBlock: Block;
  };
}

// TODO: remove
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
