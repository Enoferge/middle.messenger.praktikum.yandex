import type { ChangeUserInfoRequestData } from '@/api/user';
import UserApi from '@/api/user';
import type { ResponseError } from '@/core/http-transport/types';
import { getUserInfo } from './auth';

const userApi = new UserApi();

export const changeUserInfo = async (data: ChangeUserInfoRequestData) => {
  try {
    window.store.set({
      isFormLoading: true,
    });
    await userApi.changeUserInfo(data);

    window.store.set({
      profileMode: 'READ',
    });

    getUserInfo();
  } catch (e) {
    console.error('error while trying to change user info');
    console.error(e);
    window.store.set({
      formError: (e as ResponseError)?.data?.reason || 'Error while trying to change user info',
    });
  } finally {
    window.store.set({
      isFormLoading: false,
    });
  }
};
