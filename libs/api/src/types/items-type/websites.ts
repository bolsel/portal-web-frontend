import { FileType, UserType } from '../system-types';
import { Organizations } from './organizations';
import { DirectusStatusType } from '../index';

export type Websites = {
  id: string;
  status: DirectusStatusType;
  sort: number;
  name: string;
  slug: string;
  domain: string;
  domain_alias?: string;
  organization: Organizations;
  modules?: string[];

  user_created: UserType;
  user_updated: UserType;
  date_updated?: Date;
  date_created: Date;
};
