import { Block } from '@/core/block/block';
import { MessageBubble } from '@/components/message-bubble';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { Props } from '@/core/block/types';

import template from './messages-container.hbs?raw';
import './styles.scss';

interface MessagesContainerProps extends Props {
  messages: MessageBubbleProps[];
}

export class MessagesContainer extends Block<MessagesContainerProps> {
  constructor(props: MessagesContainerProps) {
    super('div', {
      ...props,
      class: 'messenger__content messenger__active-chat',
      children: {
        messages: props.messages.map((msg) => new MessageBubble(msg)),
      },
    });
  }

  componentDidMount(): void {
    this.scrollToBottom();
  }

  componentDidUpdate(oldProps: MessagesContainerProps, newProps: MessagesContainerProps): boolean {
    if (oldProps.messages.length !== newProps.messages.length) {
      this.updateChildren({
        ...this.children,
        messages: newProps.messages.map((msg) => new MessageBubble(msg)),
      });
      setTimeout(() => this.scrollToBottom(), 0);
      return true;
    }
    return false;
  }

  private scrollToBottom() {
    const container = this.getContent() as HTMLElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  render() {
    return template;
  }
}
