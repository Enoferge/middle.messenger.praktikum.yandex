import AuthApi from '@/api/auth';
import type { CreateUserRequestData, LoginRequestData } from '@/api/types';
import type { ResponseError } from '@/core/http-transport/types';

const authApi = new AuthApi();

export const login = async (data: LoginRequestData) => {
  try {
    window.store.isFormLoading = true;
    window.store.set({
      isFormLoading: true,
    });

    const res = await authApi.login(data);

    console.log(res);
    console.log('login succeed');
    window.store.set({
      formError: null,
    });
  } catch (e: unknown) {
    console.error('error while trying to login');
    console.error(e);
    window.store.set({
      formError: (e as ResponseError)?.data?.reason || 'Error while trying to sign in',
    });
  } finally {
    window.store.set({
      isFormLoading: false,
    });
  }
};

export const createUser = async (data: CreateUserRequestData) => {
  try {
    const res = await authApi.createUser(data);
    console.log(res);
    console.log('createUser succeed');
  } catch (e: unknown) {
    console.error('error while trying to create User');
    console.error(e);
  }
};
