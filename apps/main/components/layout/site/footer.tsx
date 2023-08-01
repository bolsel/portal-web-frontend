import { ApiResourceGetNormalizerType } from '@portalweb/api';
import { apiResourceOrganizations } from '@portalweb/api/server';
import { UIBaseIcon, UIBaseIconNamesType } from '@portalweb/ui';

export default async function Footer({
  site,
}: {
  site: ApiResourceGetNormalizerType<'websites', 'byDomain'>;
}) {
  const orgInfo = await apiResourceOrganizations().fetch({
    pathQuery: ['info', site.organization_slug!],
  });
  return (
    <footer>
      <div className="bg-primary px-5 py-8">
        <div className="ui-container">
          <div className="min-w-0 grid grid-cols-1 md:grid-cols-2 lg:justify-between gap-6 text-white">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <UIBaseIcon icon="map-pin" className="py-1 w-8 h-8" />
                <div className="flex flex-col gap-1">
                  <p className="font-roboto font-bold leading-7">Alamat</p>
                  <div className="flex flex-col text-sm leading-6">
                    <p>{orgInfo.address}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UIBaseIcon icon="mail" className="py-1 w-8 h-8" />
                <div className="flex flex-col gap-1">
                  <p className="font-roboto font-bold leading-7">Surel</p>
                  <a
                    href={`mailto:${orgInfo.email}`}
                    className="text-sm leading-6"
                  >
                    {orgInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UIBaseIcon icon="phone" className="py-1 w-8 h-8" />
                <div className="flex flex-col gap-1">
                  <p className="font-roboto font-bold leading-7">Telepon</p>
                  <p>{orgInfo.phone}</p>
                </div>
              </div>
              {orgInfo.social_media.length ? (
                <div className="flex items-start gap-3">
                  <UIBaseIcon icon="tabler-social" className="py-1 w-8 h-8" />
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Sosial Media</p>
                    <div className="w-full flex justify-between md:justify-start gap-4">
                      {orgInfo.social_media.map((s, i) => {
                        const _icon = `logo-${s.name}` as UIBaseIconNamesType;
                        return (
                          <a
                            key={i}
                            href={s.link}
                            target="_blank"
                            title={s.name}
                            rel="noreferrer"
                            className="hover:bg-primary-500 p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
                          >
                            <UIBaseIcon
                              icon={_icon}
                              fallback="link"
                              className="w-6 h-6"
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-1">
                <div className="w-full h-72">
                  {orgInfo.location_point ? (
                    <iframe
                      title="Lokasi Kantor"
                      className="w-full h-full rounded-lg"
                      width="100%"
                      src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${orgInfo.location_point.coordinates[1]},${orgInfo.location_point.coordinates[0]}&t=k&z=17&ie=UTF8&iwloc=B&output=embed`}
                    ></iframe>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-dark p-3 text-white">
        <div className="flex flex-col items-center justify-center">
          <div>&copy; 2023 {orgInfo.name}</div>
          <div className="text-xs">
            PEMERINTAH KABUPATEN BOLAANG MONGONDOW SELATAN
          </div>
        </div>
      </div>
    </footer>
  );
}
