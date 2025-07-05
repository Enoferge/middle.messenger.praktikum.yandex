import { Block } from '@/core/block/block';
import { Form } from '@/components/form';
import { Card } from '@/components/card';
import { FormFooter } from '@/components/form-footer';
import type { Props } from '@/core/block/types';
import { FormFieldName } from '@/constants/formFields';

export interface BaseUserCardProps extends Props {
  chatId: number;
  title: string;
  submitButtonText: string;
  formId: string;
  customContent?: Block;
  onSuccess?: () => void;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
}

export abstract class BaseUserCard extends Block<BaseUserCardProps> {
  protected form: Form;

  protected card: Card;

  constructor(props: BaseUserCardProps) {
    const formChildren = props.customContent ? { CustomContent: props.customContent } : {};

    const form = new Form({
      formId: props.formId,
      formFields: [
        {
          name: FormFieldName.UserId,
          label: 'User id',
          type: 'text',
          fieldType: 'input',
          value: '',
          placeholder: 'Enter user id',
        },
      ],
      formState: { [FormFieldName.UserId]: '' },
      onSubmit: props.onSubmit,
      onSuccess: () => {
        props.onSuccess?.();
      },
      children: formChildren,
    });

    const card = new Card({
      title: props.title,
      children: {
        ContentBlock: form,
        FooterBlock: new FormFooter({
          submitAction: {
            name: `${props.formId}-button`,
            formId: props.formId,
            text: props.submitButtonText,
          },
        }),
      },
    });

    super('div', {
      ...props,
      children: {
        Content: card,
      },
    });

    this.form = form;
    this.card = card;
  }

  protected updateCustomContent(newProps: Record<string, unknown>): void {
    const customContent = this.form.children.CustomContent;
    if (customContent && !Array.isArray(customContent)) {
      customContent.setProps(newProps);
    }
  }

  render() {
    return '{{{Content}}}';
  }
}
