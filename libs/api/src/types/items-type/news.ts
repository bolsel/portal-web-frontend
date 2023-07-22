import { NewsCategories } from './news_categories';
import { DirectusStatusType } from '../index';
import { FileType, UserType } from '../system-types';
export type News = {
  id: string;
  title: string;
  slug: string;
  publish_date: Date;
  category: NewsCategories;
  image_cover: FileType;
  status: DirectusStatusType;
  description: string;
  view_count: number;
  shared_count: number;
  reporter: string;
  content: {
    time: number;
    blocks: JSON;
    version: string;
  };

  user_created: UserType;
  user_updated: UserType;
  date_updated?: string;
  date_created: string;
};
