import type { ChangeUserInfoRequestData, ChangeUserPassRequestData } from '@/api/user';
import UserApi from '@/api/user';
import type { ResponseError } from '@/core/http-transport/types';

const userApi = new UserApi();

export const changeUserInfo = async (data: ChangeUserInfoRequestData) => {
  try {
    window.store.set({
      isFormLoading: true,
    });
    await userApi.changeUserInfo(data);
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

export const changeUserPass = async (data: ChangeUserPassRequestData) => {
  try {
    window.store.set({
      isFormLoading: true,
    });
    await userApi.changeUserPass(data);
  } catch (e) {
    console.error('error while trying to change user pass');
    console.error(e);
    window.store.set({
      formError: (e as ResponseError)?.data?.reason || 'Error while trying to change user pass',
    });
  } finally {
    window.store.set({
      isFormLoading: false,
    });
  }
};
