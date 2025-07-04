import { HTTPTransport } from '@/core/http-transport/http-transport';
import type { ApiError } from './types';

const userApi = new HTTPTransport('/chats');

export type GetChatsRequestData = {
  offset: string,
  limit: string,
  title?: string,
}

export type GetChatsResponseData = {
  id: number,
  title?: string,
  avatar?: string,
  unread_count?: number,
  created_by?: number,
  last_message?: {
    user?: {
      first_name: string,
      second_name: string,
      avatar: string,
      email: string,
      login: string,
      phone: string,
    },
    time?: string,
    content?: string,
  }
}

export type CreateNewChatRequestData = {
  title: string,
}

export type CreateNewChatResponseData = {
  id: number,
}

export default class ChatsApi {
  async getUserChats(data: GetChatsRequestData) {
    return userApi.get<GetChatsResponseData[] | ApiError>('', { data });
  }

  async createNewChat(data: CreateNewChatRequestData) {
    return userApi.post<CreateNewChatResponseData | ApiError>('', { data });
  }
}
