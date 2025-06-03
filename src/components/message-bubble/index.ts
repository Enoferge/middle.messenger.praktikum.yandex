import { Block } from '@/core/block/block';
import { Icon } from '@/components/icon';
import { formatTime } from '@/utils/format-time';

import template from './message-bubble.hbs?raw';
import './styles.css';
import type { MessageBubbleProps } from './types';

export class MessageBubble extends Block<MessageBubbleProps> {
  constructor(props: MessageBubbleProps) {
    super('div', {
      ...props,
      time: formatTime(props.time),
      class: `message-bubble message-bubble_${props.isIncoming ? 'incoming' : 'outcoming'}`,
      children: {
        ...(props.status
          ? {
            StatusIcon: new Icon({
              name: props.status,
              class: 'message-bubble__status-icon',
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
