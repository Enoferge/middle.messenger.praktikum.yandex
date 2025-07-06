import { FormFieldName } from '@/constants/formFields';

export function mapFormToApiFields(form: Record<string, string>) {
  const fieldsMap: Record<string, string> = {
    [FormFieldName.OldPassword]: 'oldPassword',
    [FormFieldName.Password]: 'newPassword',
  };

  return Object.entries(form).reduce<Record<string, string>>((acc, [key, value]) => {
    acc[fieldsMap[key] || key] = value;
    return acc;
  }, {});
}
