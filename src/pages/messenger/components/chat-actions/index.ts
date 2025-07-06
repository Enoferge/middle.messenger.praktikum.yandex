import { Block } from '@/core/block/block';
import { Icon } from '@/components/icon';
import type { Props } from '@/core/block/types';

import template from './chat-actions.hbs?raw';
import './styles.scss';

export interface ChatActionsProps extends Props {
  onAddUser?: () => void;
  onRemoveUser?: () => void;
  onUploadFile?: () => void;
}

export class ChatActions extends Block<ChatActionsProps> {
  constructor(props: ChatActionsProps = {}) {
    super('div', {
      ...props,
      children: {
        AddIcon: new Icon({ name: 'plus', class: 'chat-actions__icon' }),
        RemoveIcon: new Icon({ name: 'close', class: 'chat-actions__icon' }),
        UploadIcon: new Icon({ name: 'upload', class: 'chat-actions__icon' }),
      },
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-action="add"]')) {
            props.onAddUser?.();
          } else if (target.closest('[data-action="remove"]')) {
            props.onRemoveUser?.();
          } else if (target.closest('[data-action="upload"]')) {
            props.onUploadFile?.();
          }
        },
      },
    });
  }

  render() {
    return template;
  }
}
