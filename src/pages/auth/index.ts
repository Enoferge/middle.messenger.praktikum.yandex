import { Card, Form, FormFooter } from '@/components';
import { Block } from '@/core/block/block';
import type { RawPropsWithChildren } from '@/core/block/types';

import { signInFields } from './constants';
import template from './auth.hbs?raw';

export class AuthPage extends Block {
  constructor(props: RawPropsWithChildren) {
    super('fragment', {
      ...props,
      children: {
        Card: new Card({
          title: 'Sign in',
          children: {
            ContentBlock: new Form({
              formId: 'sign-in-form',
              formFields: signInFields,
              formState: {
                login: '',
                password: '',
              },
              formErrors: {
                login: '',
                password: '',
              },
            }),
            FooterBlock: new FormFooter({
              submitAction: {
                name: 'sign_in',
                text: 'Sign in',
                formId: 'sign-in-form',
              },
              secondaryAction: {
                name: 'sign_up',
                text: 'Sign up',
                onClick: (e) => {
                  e.preventDefault();
                  console.log('Clicked Sign up!');
                },
              },
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
