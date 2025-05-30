import type { BaseContext, PageName } from '@/navigation/types';
import type { Block } from '@/core/block/block';
import type { Children } from '@/core/block/types';
import type { InputFieldProps } from '../input/types';

export interface Props extends BaseContext {
  title: string;
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

export interface CardSlots {
  ContentBlock: Block;
  FooterBlock: Block;
}

export type CardProps = Props | CardSlots | Children;

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
