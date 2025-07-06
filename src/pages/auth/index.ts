import { Card, Form, FormFooter } from '@/components';
import { Block } from '@/core/block/block';
import { ROUTER } from '@/navigation/constants';
import type Router from '@/navigation/router';

import template from './auth.hbs?raw';
import type { AuthPageProps } from './types';

export class AuthPage extends Block<AuthPageProps> {
  protected router!: Router;

  constructor(props: AuthPageProps = {} as AuthPageProps) {
    const {
      title,
      formId,
      formProps,
      footerProps: { submitAction, secondaryAction },
    } = props;

    super('div', {
      ...props,
      children: {
        Card: new Card({
          title,
          children: {
            ContentBlock: new Form({
              formId,
              ...formProps,
              onSuccess: () => this.router.go(ROUTER.messenger),
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
