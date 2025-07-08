import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';
import { Block } from '@/core/block/block';
import { connect } from '@/core/hoc/connect-to-store';
import { Avatar } from '@/components/avatar';
import { IconButton } from '@/components/icon-button';
import { InputField } from '@/components/input-field';
import { FORM_FIELD_TYPE, FormFieldName } from '@/constants/formFields';
import { Form } from '@/components';
import isEqual from '@/utils/is-equal';
import { createNewChat, getUserChats, mapApiChatsToChatListItems } from '@/services/chats';
import { Modal } from '@/components/modal';
import { Card } from '@/components/card';
import { FormFooter } from '@/components/form-footer';
import { getAvatarFullUrl } from '@/utils/avatar';
import { ROUTER } from '@/navigation/constants';
import type { GetChatsResponseData } from '@/api/chats';
import type Router from '@/navigation/router';

import template from './messenger.hbs?raw';
import type { MessengerPageProps, MessengerPageState } from './types';
import ChatList from './components/chat-list/chat-list';
import './styles.scss';
import ActiveChatContainer from './components/active-chat-container';

const mapStateToProps = (state: MessengerPageState) => ({
  userChats: state.userChats || [],
  chatListItems: mapApiChatsToChatListItems(state.userChats || []),
  activeChat: state.activeChat,
  userAvatarUrl: state.userAvatarUrl,
});

class MessengerPageBase extends Block<MessengerPageProps> {
  private router!: Router;

  constructor(props?: MessengerPageProps) {
    super('div', {
      ...props,
      class: 'messenger messenger__wrapper',
      children: {
        Avatar: new Avatar({
          src: getAvatarFullUrl(props?.userAvatarUrl),
          alt: 'User avatar',
          size: 60,
          class: 'avatar--clickable',
          attrs: {
            title: 'Click to open profile settings',
          },
          events: {
            click: () => {
              this.router.go(ROUTER.profileSettings);
            },
          },
        }),
        Search: new InputField({
          name: 'search', type: 'search', placeholder: 'Search in chats...', fieldType: FORM_FIELD_TYPE.Input,
        }),
        ChatList: new ChatList({
          chats: props?.chatListItems || [],
          onChatItemClick: (id: string) => {
            const chat = this.props?.userChats?.find((c: GetChatsResponseData) => String(c.id) === id);
            window.store.set({
              activeChat: chat,
            });
          },
        }),
        Modal: new Modal({
          content: null,
        }),
        CreateNewChatButton: new IconButton({
          class: 'messenger__create-new-chat-button',
          iconName: 'plus',
          onClick: () => {
            this.showCreateChatModal();
          },
        }),
        ActiveChatContainer: new ActiveChatContainer({}),
      },
    });
    (this.children.Modal as Modal).setProps({
      onOverlayClick: () => this.hideModal(),
    });
    (this.children.Modal as Modal).hide();

    (this.children.ActiveChatContainer as Block).setProps({
      showModal: this.showModal.bind(this),
      hideModal: this.hideModal.bind(this),
      onActiveChatUpdate: () => {
        const userActiveChatIndex = this.props.userChats?.findIndex((item) => item.id === this.props.activeChat?.id) ?? -1;

        if (userActiveChatIndex !== -1) {
          const updatedUserActiveChat = { ...this.props.userChats?.[userActiveChatIndex], ...this.props.activeChat };

          window.store.set({
            userChats: [
              ...(this.props.userChats?.slice(0, userActiveChatIndex) || []),
              updatedUserActiveChat,
              ...(this.props.userChats?.slice(userActiveChatIndex + 1) || []),
            ],
          });
        }
      },
    });
  }

  componentDidMount() {
    getUserChats({ offset: '0', limit: '20' });
  }

  componentDidUpdate(oldProps: MessengerPageProps, newProps: MessengerPageProps): boolean {
    if (!isEqual(oldProps.chatListItems || {}, newProps.chatListItems || {})) {
      if (this.children.ChatList) {
        (this.children.ChatList as ChatList).setProps({ chats: newProps.chatListItems || [] });
      }

      return false;
    }

    if (!isEqual(oldProps.activeChat || {}, newProps.activeChat || {})) {
      return false;
    }

    if (oldProps.userAvatarUrl !== newProps.userAvatarUrl) {
      if (this.children.Avatar) {
        (this.children.Avatar as Avatar).setProps({
          src: getAvatarFullUrl(newProps.userAvatarUrl),
        });
      }
    }

    return false;
  }

  showCreateChatModal() {
    const form = new Form({
      formId: 'create-chat-form',
      formFields: [
        {
          name: FormFieldName.ChatTitle,
          label: 'Chat title',
          type: 'text',
          fieldType: 'input',
          value: '',
          placeholder: 'Enter new chat title',
        },
      ],
      formState: { [FormFieldName.ChatTitle]: '' },
      onSubmit: async (formData) => {
        await createNewChat({ title: formData[FormFieldName.ChatTitle] });
      },
      onSuccess: () => {
        this.hideModal();
        getUserChats({ offset: '0', limit: '20' });
      },
    });

    const card = new Card({
      title: 'Create new chat',
      children: {
        ContentBlock: form,
        FooterBlock: new FormFooter({
          submitAction: {
            name: 'create-chat-button',
            formId: 'create-chat-form',
            text: 'Create',
          },
        }),
      },
    });

    this.showModal(card);
  }

  hideModal() {
    (this.children.Modal as Modal).dispose();
  }

  showModal(content: Block) {
    (this.children.Modal as Modal).setProps({ content });
    (this.children.Modal as Modal).show();
  }

  render() {
    return template;
  }
}

const MessengerPageBaseConnected = connect<MessengerPageProps, MessengerPageState>(mapStateToProps)(MessengerPageBase);

export class MessengerPage extends BasePageWithLayout {
  constructor() {
    super(MessengerPageBaseConnected, {});
  }
}
