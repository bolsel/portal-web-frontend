import { FileType, UserType } from '../system-types';
import { Websites } from './websites';
import { DirectusStatusType } from '../index';

export type WebNews = {
  id: string;
  title: string;
  slug: string;
  publish_date: Date;
  website: Websites;
  image_cover: FileType;
  status: DirectusStatusType;
  description: string;
  view_count: number;
  shared_count: number;
  reporter: string;
  tags?: string[];
  content: {
    time: number;
    blocks: JSON;
    version: string;
  };

  user_created: UserType;
  user_updated: UserType;
  date_updated?: Date;
  date_created: Date;
};
