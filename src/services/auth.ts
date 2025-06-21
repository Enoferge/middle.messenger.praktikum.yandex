import AuthApi from '@/api/auth';
import type { CreateUserRequestData, LoginRequestData } from '@/api/types';

const authApi = new AuthApi();

export const login = async (data: LoginRequestData) => {
  try {
    const res = await authApi.login(data);

    console.log(res);
    console.log('login succeed');
  } catch (e) {
    console.error('error while trying to login');
    console.error(e);
  }
};

export const createUser = async (data: CreateUserRequestData) => {
  try {
    const res = await authApi.createUser(data);

    console.log(res);
    console.log('createUser succeed');
  } catch (e) {
    console.error('error while trying to create User');
    console.error(e);
  }
};
