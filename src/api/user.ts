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

export type ChangeUserPassRequestData = {
  'oldPassword': string,
  'newPassword': string
}

export default class UserApi {
  async changeUserInfo(data: ChangeUserInfoRequestData) {
    return userApi.put('/profile', { data });
  }

  async changeUserPass(data: ChangeUserPassRequestData) {
    return userApi.put('/password', { data });
  }
}
