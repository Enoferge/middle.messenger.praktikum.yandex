import { Card, Form, FormFooter } from '@/components';
import { Block } from '@/core/block/block';
import { withRouter, type WithRouter } from '@/core/hoc/with-router';

import template from './auth.hbs?raw';
import type { AuthPageProps } from './types';

export class AuthPageBase extends Block<AuthPageProps> {
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
              onSuccess: () => (this as unknown as WithRouter).router.go('/messenger'),
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

export const AuthPage = withRouter(AuthPageBase);
