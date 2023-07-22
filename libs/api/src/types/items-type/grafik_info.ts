import { FileType, UserType } from '../system-types';

export type GrafikInfo = {
  id: string;
  status: string;
  title: string;
  image: string | FileType;
  publish_date: Date;
  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
