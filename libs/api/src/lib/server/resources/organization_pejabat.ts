import { apiBaseResource } from '../base-resource';
import { apiNormalizerBase } from '../normalizers';

export const apiResourceOrganizationPejabat = () => {
  return apiBaseResource({
    resourceKey: 'organization_pejabat',
    defaultQuery: {
      fields: [
        'id',
        'name',
        'image.*',
        'jabatan',
        'nip',
        'profil',
        'organization.id',
        'organization.name',
        'organization.slug',
      ],
    },
    paths: {
      list({ query }) {
        return {
          query: {
            fields: query.fields,
          },
          normalizer(data) {
            const { id, name, image, jabatan, nip, profil, organization } =
              data;

            return {
              id,
              name,
              image: apiNormalizerBase.imageFile(image),
              jabatan,
              nip,
              profil: apiNormalizerBase.contentBlocks(profil),
              organization,
            };
          },
        };
      },
    },
  });
};
