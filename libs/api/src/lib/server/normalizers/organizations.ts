import { apiNormalizerBase } from '.';
import { ApiItemsType } from '../../../types';

export function info(data: ApiItemsType['organizations']) {
  const {
    id,
    name,
    slug,
    address,
    phone,
    location_point,
    email,
    social_media,
    sekilas,
    visi,
    misi,
    structure,
  } = data;
  return {
    id,
    name,
    slug,
    address,
    phone,
    location_point,
    email,
    social_media: social_media ?? [],
    sekilas: apiNormalizerBase.contentBlocks(sekilas),
    visi: apiNormalizerBase.contentBlocks(visi),
    misi: apiNormalizerBase.contentBlocks(misi),
    structure: apiNormalizerBase.contentBlocks(structure),
  };
}
