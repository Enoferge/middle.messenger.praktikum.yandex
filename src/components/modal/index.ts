import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';

import template from './modal.hbs?raw';
import './modal.scss';

export interface ModalProps extends Props {
  onOverlayClick?: () => void;
  content?: Block | null;
}

export class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    const children = props.content ? { Content: props.content } : undefined;
    super('div', {
      class: 'modal__overlay',
      ...props,
      ...(children ? { children } : {}),
    });
  }

  computeEvents() {
    return {
      click: (e: Event) => {
        if ((e.target as HTMLElement).classList.contains('modal__overlay')) {
          this.props.onOverlayClick?.();
        }
      },
    };
  }

  show() {
    const content = this.getContent();

    if (content) {
      this._isElementHidden = false;
      content.style.display = 'flex';
    }
  }

  componentDidUpdate(oldProps: ModalProps, newProps: ModalProps) {
    if (oldProps.content !== newProps.content) {
      this.updateChildren({
        Content: newProps.content || [],
      });
      newProps.content?.dispatchComponentDidMount();
    }
    return true;
  }

  render() {
    return template;
  }
}
