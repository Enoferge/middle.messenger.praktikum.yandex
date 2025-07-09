export interface ChatListItem {
  id: string;
  chatName?: string | null;
  chatAvatar?: string | null;
  lastMsgPreview?: string | null;
  unreadMsgCount?: number | null;
  lastMsgTime?: string | null;
}
