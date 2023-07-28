import { FileType, UserType } from '../system-types';
import { DirectusStatusType } from '../index';

export type BannerInfo = {
  id: string;
  status: DirectusStatusType;
  title: string;
  sort: number;
  image: FileType;
  link?: string;
  user_created: UserType;
  user_updated: UserType;
  date_updated?: Date;
  date_created: Date;
};
