import { Card, Form, FormFooter, Input } from '@/components';
import { Block } from '@/core/block/block';

import type { AuthPageProps } from './types';
import { signInFields } from './constants';
import template from './auth.hbs?raw';

export class AuthPage extends Block {
  constructor(props: AuthPageProps) {
    super('div', {
      ...props,
      Card: new Card({
        title: 'Sign in',
        ContentBlock: new Form({
          formId: 'sign-in-form',
          FormFields: signInFields.map((field) => new Input(field)),
        }),
        FooterBlock: new FormFooter({
          submitAction: {
            name: 'sign_in',
            text: 'Sign in',
            formId: 'sign-in-form',
            onClick: (e) => {
              e.preventDefault();
              console.log('Clicked Sign in!');
            },
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
      }),
    });
  }

  render() {
    return template;
  }
}
