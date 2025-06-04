import { Block } from '@/core/block/block';
import { Button } from '@/components/button';
import { Link } from '@/components/link';

import './styles.css';
import template from './form-footer.hbs?raw';
import type { FormFooterProps } from './types';

export class FormFooter extends Block<FormFooterProps> {
  constructor(props: FormFooterProps) {
    super('div', {
      ...props,
      children: {
        SubmitAction: new Button({
          ...props.submitAction,
          type: 'submit',
          fullWidth: true,
        }),
        ...(props.secondaryAction
          ? {
            SecondaryAction: new Link({
              ...props.secondaryAction,
            }),
          }
          : {}),
      },
    });
  }

  render() {
    return template;
  }
}
