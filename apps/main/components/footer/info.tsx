'use client';
import { UIBaseIcon } from '@portalweb/ui';
import { useMainLayoutContext } from '../main-layout-provider';

export function Info() {
  const mainLayout = useMainLayoutContext();
  const settings = mainLayout.settings;

  return (
    <div className="min-w-0 grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-6 text-white">
      <div className="flex items-start gap-3">
        <UIBaseIcon icon="map-pin" className="py-1 w-8 h-8" />
        <div className="flex flex-col gap-1">
          <p className="font-roboto font-bold leading-7">
            Kompleks Perkantoran Panango
          </p>
          <div className="flex flex-col text-sm leading-6">
            <p>
              {settings.address ??
                'Jalan Ir. Soekarno, Tabilaa, Kec. Bolaang Uki'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <UIBaseIcon icon="mail" className="py-1 w-8 h-8" />
        <div className="flex flex-col gap-1">
          <p className="font-roboto font-bold leading-7">Surel</p>
          <a href="mailto:info@bolselkab.go.id" className="text-sm leading-6">
            {settings.email ?? 'info@bolselkab.go.id'}
          </a>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <UIBaseIcon icon="tabler-social" className="py-1 w-8 h-8" />
        <div className="flex flex-col gap-1">
          <p className="font-bold">Media Sosial</p>
          <div className="w-full flex justify-between md:justify-start gap-6">
            {settings.link_facebook ? (
              <a
                href={settings.link_facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:bg-[#1877F2] p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
              >
                <UIBaseIcon icon="facebook" className="w-6 h-6" />
              </a>
            ) : null}
            {settings.link_twitter ? (
              <a
                href={settings.link_twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="hover:bg-[#1DA1F2] p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
              >
                <UIBaseIcon icon="twitter" className="w-6 h-6" />
              </a>
            ) : null}
            {settings.link_instagram ? (
              <a
                href={settings.link_instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:bg-[#E4405F] p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
              >
                <UIBaseIcon icon="instagram" className="w-6 h-6" />
              </a>
            ) : null}
            {settings.link_youtube ? (
              <a
                href={settings.link_youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="Youtube"
                className="hover:bg-[#CD201F] p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
              >
                <UIBaseIcon icon="youtube" className="w-6 h-6" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
