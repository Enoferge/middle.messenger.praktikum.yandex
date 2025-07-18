import { HTTPTransport } from '@/core/http-transport/http-transport';
import type { ApiError } from './types';

const userApi = new HTTPTransport('/chats');

export type GetChatsRequestData = {
  offset: string,
  limit: string,
  title?: string,
}

type GetChatsResponseData = {
  id: number,
  title?: string | null,
  avatar?: string | null,
  unread_count?: number | null,
  created_by?: number | null,
  last_message?: {
    user?: {
      first_name?: string | null,
      second_name?: string | null,
      avatar?: string | null,
      email?: string | null,
      login?: string | null,
      phone?: string | null,
    },
    time?: string | null,
    content?: string | null,
  }
}
export type { GetChatsResponseData as ChatInfo };

export type CreateNewChatRequestData = {
  title: string,
}

export type CreateNewChatResponseData = {
  id: number,
}

export type AddUsersToChatRequestData = {
  users: number[],
  chatId: number,
}

export type RemoveUsersFromChatRequestData = {
  users: number[],
  chatId: number,
}

export type GetChatUsersRequestData = {
  id: number,
  offset?: number,
  limit?: number,
  name?: string,
  email?: string,
}

export type GetChatUsersResponseDataDto = {
  id: number,
  first_name?: string | null,
  second_name?: string | null,
  display_name?: string | null,
  login: string,
  avatar?: string | null,
  role?: string | null,
}

export type ChangeChatAvatarResponseData = {
  id: number,
  title: string,
  avatar: string,
  created_by: number
}

export type GetChatTokenRequestData = {
  id: number,
}

export type GetChatTokenResponseData = {
  token: string,
}

export default class ChatsApi {
  async getUserChats(data: GetChatsRequestData) {
    return userApi.get<GetChatsResponseData[] | ApiError>('', { data });
  }

  async createNewChat(data: CreateNewChatRequestData) {
    return userApi.post<CreateNewChatResponseData | ApiError>('', { data });
  }

  async addUsersToChat(data: AddUsersToChatRequestData) {
    return userApi.put<void | ApiError>('/users', { data });
  }

  async removeUsersFromChat(data: RemoveUsersFromChatRequestData) {
    return userApi.delete<void | ApiError>('/users', { data });
  }

  async getChatUsers(data: GetChatUsersRequestData) {
    return userApi.get<GetChatUsersResponseDataDto[] | ApiError>(`/${data.id}/users`, { data });
  }

  async changeChatAvatar(data: FormData) {
    return userApi.put<ChangeChatAvatarResponseData | ApiError>('/avatar', { data });
  }

  async getChatToken(data: GetChatTokenRequestData) {
    return userApi.post<GetChatTokenResponseData | ApiError>(`/token/${data.id}`, { data });
  }
}
