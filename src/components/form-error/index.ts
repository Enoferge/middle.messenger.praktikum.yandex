import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';

interface FormErrorProps extends Props {
  error?: string | null;
}

export class FormError extends Block<FormErrorProps> {
  constructor(props: FormErrorProps) {
    super('div', {
      ...props,
      class: 'form__error-caption',
    });
  }

  componentDidUpdate(oldProps: FormErrorProps, newProps: FormErrorProps): boolean {
    if (oldProps.error !== newProps.error) {
      newProps.error ? this.show() : this.hide()
      return true;
    }
    return false
  }

  render() {
    return '<div>{{error}}</div>';
  }
} 