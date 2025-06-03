import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';

import template from './chat-item.hbs?raw';
import './styles.css';
import type { ChatItemProps } from './types';
import { formatTime } from '@/utils/format-time';

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super('div', {
      ...props,
      lastMsgTime: props.lastMsgTime ? formatTime(props.lastMsgTime) : '',
      class: 'chat-item__wrapper',
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
