import { HTTPTransport } from '@/core/http-transport/http-transport';
import type {
  ApiError, CreateUserRequestData, LoginRequestData, SignUpResponse, UserDTO,
} from './types';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
  async createUser(data: CreateUserRequestData) {
    return authApi.post<SignUpResponse | ApiError>('/signup', { data });
  }

  async login(data: LoginRequestData) {
    return authApi.post<void | ApiError>('/signin', { data });
  }

  async getUserInfo() {
    return authApi.get<UserDTO | ApiError>('/user');
  }

  async logOut() {
    return authApi.post<void | ApiError>('/logout');
  }
}
