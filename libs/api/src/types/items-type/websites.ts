import { FileType, UserType } from '../system-types';
import { Organizations } from './organizations';
import { DirectusStatusType } from '../index';

export type Websites = {
  id: string;
  status: DirectusStatusType;
  sort: number;
  name: string;
  slug: string;
  subdomain: string;
  domain_alias?: string;
  organization?: string | Organizations;
  modules?: string[];

  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
