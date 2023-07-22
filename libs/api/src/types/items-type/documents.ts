import { FileType, UserType } from '../system-types';
import { DirectusStatusType } from '../index';
import { DocumentCategories } from './document_categories';

export type Documents = {
  id: string;
  status: DirectusStatusType;
  publish_date: Date;
  category: DocumentCategories;
  file: FileType;
  title: string;
  description: string;
  slug: string;
  user_created: UserType;
  user_updated: UserType;
  date_updated?: Date;
  date_created: Date;
};
