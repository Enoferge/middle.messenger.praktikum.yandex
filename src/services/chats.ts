import type { GetChatsRequestData, GetChatsResponseData } from '@/api/chats';
import ChatsApi from '@/api/chats';
import type { ChatItemProps } from '@/components/chat-item/types';
import type { ResponseError } from '@/core/http-transport/types';

const chatsApi = new ChatsApi();

export function mapApiChatsToChatListProps(apiChats: GetChatsResponseData[]): ChatItemProps[] {
  return apiChats.map(chat => ({
    id: String(chat.id),
    chatName: chat.title ?? '',
    chatAvatar: chat.avatar ?? '',
    lastMsgPreview: chat.last_message?.content ?? '',
    lastMsgUserName: chat.last_message?.user?.first_name ?? '',
    unreadMsgCount: chat.unread_count,
    lastMsgTime: chat.last_message?.time ?? '',
  }));
} 

export const getUserChats = async (requestData: GetChatsRequestData): Promise<void> => {
  const mockedData: GetChatsResponseData[] = [
    {
      id: 123,
      title: 'Kaito x Enoferge',
      avatar: '/123/avatar1.jpg',
      unread_count: 15,
      created_by: 12345,
      last_message: {
        user: {
          first_name: 'Kaito',
          second_name: 'Umaha',
          avatar: '/path/to/avatar.jpg',
          email: 'kaito@email.com',
          login: 'kaitoLogin',
          phone: '8(911)-222-33-22',
        },
        time: '2020-01-02T14:22:22.000Z',
        content: 'this is message content',
      },
    },
    {
      id: 124,
      title: 'work-group',
      avatar: '/124/avatar2.jpg',
      unread_count: 3,
      created_by: 54321,
      last_message: {
        user: {
          first_name: 'Asano',
          second_name: 'Mayuko',
          avatar: '/path/to/avatar2.jpg',
          email: 'mayuko@email.com',
          login: 'mayukoLogin',
          phone: '8(911)-333-44-55',
        },
        time: '2020-02-03T10:15:00.000Z',
        content: 'meeting at 3pm',
      },
    },
    {
      id: 125,
      title: 'family',
      avatar: '/125/avatar3.jpg',
      unread_count: 0,
      created_by: 67890,
      last_message: {
        user: {
          first_name: 'Geto',
          second_name: 'Suguru',
          avatar: '/path/to/avatar3.jpg',
          email: 'geto@email.com',
          login: 'getoLogin',
          phone: '8(911)-555-66-77',
        },
        time: '2020-03-04T18:45:30.000Z',
        content: 'see you soon!',
      },
    },
    {
      id: 126,
      title: 'project-x',
      avatar: '/126/avatar4.jpg',
      unread_count: 7,
      created_by: 11223,
      last_message: {
        user: {
          first_name: 'Megumi',
          second_name: 'Fushiguro',
          avatar: '/path/to/avatar4.jpg',
          email: 'megumi@email.com',
          login: 'megumiLogin',
          phone: '8(911)-777-88-99',
        },
        time: '2020-04-05T09:30:00.000Z',
        content: 'deadline extended',
      },
    },
    {
      id: 127,
      title: 'travel-buddies',
      avatar: '/127/avatar5.jpg',
      unread_count: 1,
      created_by: 33445,
      last_message: {
        user: {
          first_name: 'Satoru',
          second_name: 'Gojo',
          avatar: '/path/to/avatar5.jpg',
          email: 'satoru@email.com',
          login: 'satoruLogin',
          phone: '8(911)-999-00-11',
        },
        time: '2020-05-06T21:10:00.000Z',
        content: 'tickets booked!',
      },
    },
  ]

  try {
    const { data } = await chatsApi.getUserChats(requestData);
    const chatListProps = mapApiChatsToChatListProps([...(data as GetChatsResponseData[] || []), ...mockedData]);
    window.store.set({ userChats: chatListProps });
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to get user chats');
  } finally {
  }
};
