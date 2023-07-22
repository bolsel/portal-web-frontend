import { FileType, UserType } from '../system-types';
import { DirectusStatusType } from '../index';

export type BannerInfo = {
  id: string;
  status: DirectusStatusType;
  title: string;
  sort: number;
  image: string | FileType;
  link?: string;
  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
