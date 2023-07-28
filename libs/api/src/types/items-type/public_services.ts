import { FileType, UserType } from '../system-types';
import { Organizations } from './organizations';

export type PublicServices = {
  id: string;
  status: string;
  sort: number;
  title: string;
  description: string;
  logo: FileType;
  organization?: Organizations;

  type: ('online' | 'offline')[];
  slug: string;
  address: string;
  phones: { number: string; description: string }[];
  email: string;
  links: { name: string; link: string }[];
  operational_hours: { day: number; open: boolean; start: Date; end: Date }[];
  images: { id: string; image: FileType; sort: number }[];
  social_media: { name: string; link: string }[];
  informations: { title: string; item: string[] }[];

  user_created: UserType;
  user_updated: UserType;
  date_updated?: Date;
  date_created: Date;
};
