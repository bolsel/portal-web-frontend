import { FileType, UserType } from '../system-types';
import { Organizations } from './organizations';

export type PublicServices = {
  id: string;
  status: string;
  sort: number;
  title: string;
  description: string;
  logo: string | FileType;
  organization?: string | Organizations;

  type: 'online' | 'offline';
  address: string;
  phones: { number: string; description: string }[];
  email: string;
  links: { name: string; link: string }[];
  operational_hours: { day: number; open: boolean; start: Date; end: Date }[];
  images: FileType[];
  social_media: { name: string; link: string }[];
  informations: { title: string; item: string[] }[];

  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
