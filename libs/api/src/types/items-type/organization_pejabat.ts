import { Organizations } from './organizations';
import { FileType } from '../system-types';

export type OrganizationPejabat = {
  id: string;
  name: string;
  nip: string;
  jabatan: string;
  organization: Organizations;
  image: FileType;
  profil: string;
};
