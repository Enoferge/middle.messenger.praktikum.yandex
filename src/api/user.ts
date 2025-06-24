import { HTTPTransport } from '@/core/http-transport/http-transport';

const userApi = new HTTPTransport('/user');

export type ChangeUserInfoRequestData = {
  'first_name': string,
  'second_name': string,
  'display_name': string,
  'login': string,
  'email': string,
  'phone': string
}

export default class UserApi {
  async changeUserInfo(data: ChangeUserInfoRequestData) {
    return userApi.put('/profile', { data });
  }
}
