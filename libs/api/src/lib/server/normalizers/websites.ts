import { ApiItemsType } from '../../../types';

export function base(data: ApiItemsType['websites']) {
  return {
    id: data.id,
    name: data.name,
  };
}
