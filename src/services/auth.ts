import AuthApi from '@/api/auth';
import type { CreateUserRequestData, LoginRequestData, UserDTO } from '@/api/types';
import type { ResponseError } from '@/core/http-transport/types';

const authApi = new AuthApi();

export const getUserInfo = async () => {
  try {
    window.store.set({
      isUserInfoLoading: true,
    });
    const { data } = await authApi.getUserInfo();
    const { id, avatar, ...info } = data as UserDTO
    window.store.set({
      user: info,
    });
  } catch (e: unknown) {
    console.error('error while trying to get user info');
    console.error(e);
  } finally {
    window.store.set({
      isUserInfoLoading: false,
    });
  }
};

export const login = async (data: LoginRequestData) => {
  try {
    window.store.set({
      isFormLoading: true,
    });

    const res = await authApi.login(data);

    console.log(res);
    console.log('login succeed');

    await getUserInfo(); // move
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

    await getUserInfo(); // move
  } catch (e: unknown) {
    console.error('error while trying to create User');
    console.error(e);
    window.store.set({
      formError: (e as ResponseError)?.data?.reason || 'Error while trying to sign up',
    });
  }
};

export const signOut = async () => {
  try {
    await authApi.logOut();
    window.store.set({
      user: null,
    });
    return true;
  } catch (e: unknown) {
    console.error('error while trying to sign out');
    console.error(e);
    return false;
  }
};
