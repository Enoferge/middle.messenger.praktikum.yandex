import { getResourceLink } from '@/services/resources';

export function getAvatarFullUrl(url?: string | null): string {
  return url ? getResourceLink(url) : '/assets/images/image-not-found.png';
} 