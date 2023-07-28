import { FileType, UserType } from '../system-types';

export type GrafikInfo = {
  id: string;
  status: string;
  title: string;
  image: FileType;
  publish_date: Date;
  user_created: UserType;
  user_updated: UserType;
  date_updated?: Date;
  date_created: Date;
};
