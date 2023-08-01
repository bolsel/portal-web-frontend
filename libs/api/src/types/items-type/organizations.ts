import { DirectusStatusType } from '../index';
import { UserType } from '../system-types';
import { OrganizationTypes } from './organization_types';

export type Organizations = {
  id: string;
  status: DirectusStatusType;
  name: string;
  type: OrganizationTypes;
  slug: string;

  email: string;
  phone: string;
  address: string;
  location_point: { type: 'Point'; coordinates: [number, number] };
  social_media: { name: string; link: string }[];
  structure: string;
  sekilas: string;
  visi: string;
  misi: string;

  user_created: UserType;
  user_updated: UserType;
  date_updated?: Date;
  date_created: Date;
};
