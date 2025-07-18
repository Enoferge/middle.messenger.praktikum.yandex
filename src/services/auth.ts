import AuthApi from '@/api/auth';
import type { CreateUserRequestData, LoginRequestData, UserDTO } from '@/api/types';
import type { ResponseError } from '@/core/http-transport/types';

const authApi = new AuthApi();

export const getUserInfo = async () => {
  try {
    const { data } = await authApi.getUserInfo();
    const { avatar, ...userInfo } = data as UserDTO;

    window.store.set({
      user: userInfo,
      userAvatarUrl: avatar,
    });
  } catch (e: unknown) {
    console.error('error while trying to get user info');
    console.error(e);
  }
};

export const login = async (data: LoginRequestData) => {
  try {
    await authApi.login(data);
    await getUserInfo();
  } catch (e: unknown) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to sign in');
  }
};

export const createUser = async (data: CreateUserRequestData): Promise<void> => {
  try {
    await authApi.createUser(data);
    await getUserInfo();
  } catch (e: unknown) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to sign up');
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
