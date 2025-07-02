import type { ChangeUserInfoRequestData, ChangeUserPassRequestData } from '@/api/user';
import UserApi from '@/api/user';
import type { ResponseError } from '@/core/http-transport/types';
import { formController } from '@/services/form-controller';

const userApi = new UserApi();

export const changeUserInfo = async (data: ChangeUserInfoRequestData): Promise<void> => {
  try {
    formController.setLoading(true);
    await userApi.changeUserInfo(data);
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to change user info');
  } finally {
    formController.setLoading(false);
  }
};

export const changeUserPass = async (data: ChangeUserPassRequestData): Promise<void> => {
  try {
    formController.setLoading(true);
    await userApi.changeUserPass(data);
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to change user pass');
  } finally {
    formController.setLoading(false);
  }
};

export const changeUserAvatar = async (formData: FormData): Promise<void> => {
  try {
    await userApi.changeUserAvatar(formData);
  } catch (e) {
    throw new Error((e as ResponseError)?.data?.reason || 'Error while trying to change user avatar');
  }
};
