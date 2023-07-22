import { FileType, UserType } from '../system-types';
import { Websites } from './websites';
import { DirectusStatusType } from '../index';

export type WebNews = {
  id: string;
  title: string;
  slug: string;
  publish_date: Date;
  website: string | Websites;
  image_cover: string | FileType;
  status: DirectusStatusType;
  description: string;
  view_count: number;
  shared_count: number;
  reporter: string;
  tags?: string[];
  content: {
    time: number;
    blocks: Record<string, any>[];
    version: string;
  };

  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
