type IconName = 'file' | 'plus' | 'send' | 'upload' | 'close' | 'settings' | 'delivered' | 'seen';

export interface IconProps {
  name?: IconName;
  class?: string;
}
