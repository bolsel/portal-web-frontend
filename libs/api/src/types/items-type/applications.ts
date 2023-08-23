import { FileType, UserType } from '../system-types';
import { DirectusStatusType } from '../index';
import { ApplicationCategories } from './application_categories';
import { Organizations } from './organizations';

export type Applications = {
  id: string;
  status: DirectusStatusType;
  sort: number;
  slug: string;
  title: string;
  description?: string;
  logo?: FileType;
  categories: { id: string; category: ApplicationCategories }[];
  link?: string;
  links?: { link: string; name: string }[];
  social_media?: { link: string; name: string }[];
  organization?: Organizations;

  user_created: UserType;
  user_updated: UserType;
  date_updated?: Date;
  date_created: Date;
};