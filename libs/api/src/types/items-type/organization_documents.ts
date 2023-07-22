import { Organizations } from './organizations';
import { FileType, UserType } from '../system-types';
import { DirectusStatusType } from '../index';

export type OrganizationDocuments = {
  id: string;
  status: DirectusStatusType;
  publish_date: Date;
  organization: string | Organizations;
  category: string;
  title: string;
  description?: string;
  slug?: string;
  file: string | FileType;

  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
