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
import { formatTime } from '@/utils/format-time';

const chatsApi = new ChatsApi();

export function mapApiChatsToChatListItems(apiChats: ChatInfo[]): ChatListItem[] {
  return apiChats.map((chat: ChatInfo) => ({
    id: String(chat.id),
    chatName: chat.title ?? '',
    chatAvatar: chat.avatar ?? '',
    lastMsgPreview: chat.last_message?.content ?? '',
    lastMsgUserName: chat.last_message?.user?.first_name ?? '',
    unreadMsgCount: chat.unread_count,
    lastMsgTime: chat.last_message?.time ? formatTime(chat.last_message.time) : '',
  }));
}

export const getUserChats = async (requestData: GetChatsRequestData): Promise<void> => {
  try {
    const { data } = await chatsApi.getUserChats(requestData);
    window.store.set({
      userChats: data || [],
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
      window.store.set({ activeChatUsers: data });
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
