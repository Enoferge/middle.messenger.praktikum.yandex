import type { ChatItemProps } from '@/components/chat-item/types';
import type { MessageBubbleProps } from '@/components/message-bubble/types';

export const messengerChats: Array<ChatItemProps> = [
  {
    id: '1',
    contactName: 'Kaito',
    contactAvatar: '/assets/images/user1.png',
    lastMsgPreview: 'It was nice to see you!',
    unreadMsgCount: 6,
    lastMsgTime: '2025-05-29T18:49:29.949Z',
  },
  {
    id: '2',
    contactName: 'Kaito',
    contactAvatar: '/assets/images/user1.png',
    lastMsgPreview: 'It was nice to see you!',
    unreadMsgCount: 0,
    lastMsgTime: '2025-05-29T18:49:29.949Z',
  },
  {
    id: '3',
    contactName: 'Kaito',
    contactAvatar: '/assets/images/user1.png',
    lastMsgPreview: 'It was nice to see you!',
    unreadMsgCount: 5,
    lastMsgTime: '2025-05-29T18:49:29.949Z',
  },
  {
    id: '4',
    contactName: 'Kaito',
    contactAvatar: '/assets/images/user1.png',
    lastMsgPreview: 'It was nice to see you!',
    unreadMsgCount: 2,
    lastMsgTime: '2025-05-29T18:49:29.949Z',
  },
  {
    id: '5',
    contactName: 'Kaito',
    contactAvatar: '/assets/images/user1.png',
    lastMsgPreview: 'It was nice to see you!',
    unreadMsgCount: 1,
    lastMsgTime: '2025-05-29T18:49:29.949Z',
  },
];

export const activeChatMessages: Array<MessageBubbleProps> = [
  {
    id: '211',
    isIncoming: false,
    status: 'seen',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation',
    time: '2025-05-29T18:49:29.949Z',
  },
  {
    id: '212',
    isIncoming: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.',
    time: '2025-05-29T18:49:29.949Z',
  },
  {
    id: '213',
    isIncoming: false,
    status: 'seen',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in',
    time: '2025-05-29T18:49:29.949Z',
  },
  {
    id: '214',
    isIncoming: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation',
    time: '2025-05-29T18:49:29.949Z',
  },
  {
    id: '215',
    isIncoming: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.',
    time: '2025-05-29T18:49:29.949Z',
  },
  {
    id: '216',
    isIncoming: false,
    status: 'delivered',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in',
    time: '2025-05-29T18:49:29.949Z',
  },
];
