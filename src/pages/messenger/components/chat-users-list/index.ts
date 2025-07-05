import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';

import './styles.scss';
import template from './chat-users-list.hbs?raw';

type User = {
  id: number;
  login: string;
};

export interface ChatUsersListProps extends Props {
  users: User[];
}

export class ChatUsersList extends Block<ChatUsersListProps> {
  constructor(props: ChatUsersListProps) {
    super('div', props);
  }

  render() {
    return template;
  }
}
