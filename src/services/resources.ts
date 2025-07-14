import { BASE_API_URL } from '@/constants/base';

export const getResourceLink = (resourceUrl: string) => `${BASE_API_URL}/resources${resourceUrl}`;
