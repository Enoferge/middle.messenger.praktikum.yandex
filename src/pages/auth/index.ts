import { Card, Form, FormFooter } from '@/components';
import { Block } from '@/core/block/block';

import template from './auth.hbs?raw';
import type { AuthPageProps } from './types';

export class AuthPage extends Block {
  constructor(props: AuthPageProps) {
    const {
      title,
      formId,
      formProps,
      footerProps: { submitAction, secondaryAction },
    } = props;

    super('fragment', {
      ...props,
      children: {
        Card: new Card({
          title,
          children: {
            ContentBlock: new Form({
              formId,
              ...formProps,
            }),
            FooterBlock: new FormFooter({
              submitAction: { ...submitAction, formId },
              secondaryAction,
            }),
          },
        }),
      },
    });
  }

  render() {
    return template;
  }
}
