import AuthApi from '@/api/auth';
import type { LoginRequestData } from '@/api/types';

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
