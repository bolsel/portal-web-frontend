import { Websites } from './websites';

export type WebAduanPublik = {
  id: string;
  nama: string;
  email: string;
  hp: string;
  isi: string;
  website: string | Websites;
  date_updated?: Date;
  date_created: Date;
};
