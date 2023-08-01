import { Organizations } from './organizations';
import { FileType, UserType } from '../system-types';
import { DirectusStatusType } from '../index';

export type OrganizationDocuments = {
  id: string;
  status: DirectusStatusType;
  publish_date: Date;
  organization: Organizations;
  category: string;
  title: string;
  description?: string;
  slug?: string;
  file: FileType;

  user_created: UserType;
  user_updated: UserType;
  date_updated?: Date;
  date_created: Date;
};
