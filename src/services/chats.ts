import type {
  AddUsersToChatRequestData,
  CreateNewChatRequestData,
  GetChatsRequestData,
  ChatInfo,
  GetChatUsersRequestData,
  GetChatUsersResponseDataDto,
  RemoveUsersFromChatRequestData,
  GetChatTokenRequestData,
  GetChatTokenResponseData,
} from '@/api/chats';
import ChatsApi from '@/api/chats';
import type { ResponseError } from '@/core/http-transport/types';
import type { ChatListItem } from '@/pages/messenger/types';

const chatsApi = new ChatsApi();

export function mapApiChatsToChatListItems(apiChats: ChatInfo[]): ChatListItem[] {
  return apiChats.map((chat: ChatInfo) => ({
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
  const mockedData: ChatInfo[] = [
    // {
    //   id: 123,
    //   title: 'Kaito x Enoferge',
    //   avatar: '/123/avatar1.jpg',
    //   unread_count: 15,
    //   created_by: 12345,
    //   last_message: {
    //     user: {
    //       first_name: 'Kaito',
    //       second_name: 'Umaha',
    //       avatar: '/path/to/avatar.jpg',
    //       email: 'kaito@email.com',
    //       login: 'kaitoLogin',
    //       phone: '8(911)-222-33-22',
    //     },
    //     time: '2020-01-02T14:22:22.000Z',
    //     content: 'this is message content',
    //   },
    // },
    {
      id: 124,
      title: 'work-group',
      avatar: null,
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
  ];

  try {
    const { data } = await chatsApi.getUserChats(requestData);
    window.store.set({
      userChats: [...(data as ChatInfo[] || []), ...mockedData],
    });
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to get user chats');
  }
};

export const getUserChatByTitle = async (title: GetChatsRequestData['title'] | null): Promise<ChatInfo | null> => {
  try {
    if (title) {
      const { data } = await chatsApi.getUserChats({ offset: '0', limit: '1', title });
      return (data as ChatInfo[])?.[0];
    }
    return null;
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to get user chat by title');
  }
};

export const createNewChat = async (requestData: CreateNewChatRequestData): Promise<void> => {
  try {
    await chatsApi.createNewChat(requestData);
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to create new chat');
  }
};

export const addUsersToChat = async (requestData: AddUsersToChatRequestData): Promise<void> => {
  try {
    await chatsApi.addUsersToChat(requestData);
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to add users to chat');
  }
};

export const removeUsersFromChat = async (requestData: RemoveUsersFromChatRequestData): Promise<void> => {
  try {
    await chatsApi.removeUsersFromChat(requestData);
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to remove users from chat');
  }
};

export const getChatUsers = async (requestData: GetChatUsersRequestData): Promise<GetChatUsersResponseDataDto[]> => {
  try {
    const { data } = await chatsApi.getChatUsers(requestData);

    if (Array.isArray(data)) {
      window.store.set({ chatUsers: data });
    }

    return data as GetChatUsersResponseDataDto[];
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to get chat users');
  }
};

export const changeChatAvatar = async (formData: FormData): Promise<void> => {
  try {
    await chatsApi.changeChatAvatar(formData);
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to change chat avatar');
  }
};

export const getChatToken = async (requestData: GetChatTokenRequestData) => {
  if (!requestData.id) {
    return;
  }

  try {
    const { data } = await chatsApi.getChatToken(requestData);
    const token = (data as GetChatTokenResponseData)?.token;

    if (token) {
      window.store.set({
        activeChatToken: token,
      });
    }
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to get chat token');
  }
};
