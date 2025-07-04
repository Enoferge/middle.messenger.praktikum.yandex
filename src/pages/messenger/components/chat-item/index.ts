import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { formatTime } from '@/utils/format-time';

import template from './chat-item.hbs?raw';
import './styles.scss';
import type { ChatItemProps } from './types';

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super('div', {
      ...props,
      lastMsgTime: props.lastMsgTime ? formatTime(props.lastMsgTime) : '',
      class: 'chat-item__wrapper',
      events: {
        click: () => {
          props.onClickChatItem?.(props.id);
        },
      },
      children: {
        Avatar: new Avatar({
          src: '/assets/images/user1.png',
          alt: 'User avatar',
          size: 60,
        }),
      },
    });
  }

  render() {
    return template;
  }
}
