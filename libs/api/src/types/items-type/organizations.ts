import { DirectusStatusType } from '../index';
import { FileType, UserType } from '../system-types';

export type Organizations = {
  id: string;
  status: DirectusStatusType;
  name: string;
  type: string | Organizations;
  slug: string;

  email: string;
  phone: string;
  address: string;
  location_point: any;
  social_media: any;
  structure: string;
  sekilas: string;
  visi: string;
  misi: string;

  // websites: any,
  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
