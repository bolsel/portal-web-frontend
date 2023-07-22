import { Organizations } from './organizations';
import { FileType } from '../system-types';

export type OrganizationPejabat = {
  id: string;
  name: string;
  nip: string;
  jabatan: string;
  organization: string | Organizations;
  image: string | FileType;
  profil: string;
};
