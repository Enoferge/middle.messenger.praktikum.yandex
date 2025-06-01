import { Block } from '@/core/block/block';
import { Button } from '@/components/button';

import './styles.css';
import template from './form-footer.hbs?raw';
import type { FormFooterProps } from './types';

export class FormFooter extends Block {
  constructor(props: FormFooterProps) {
    super('div', {
      children: {
        SubmitAction: new Button({
          ...props.submitAction,
          type: 'submit',
          fullWidth: true,
        }),
        ...(props.secondaryAction
          ? {
              SecondaryAction: new Button({
                ...props.secondaryAction,
                variant: 'plain',
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
