import SwrBannerList from '../../components/swr/banner-list';
import SiteLayout from '../../components/layout/site/layout';
import { getSiteData } from '../../lib/site';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import BeritaLists from './_BeritaLists';
import MainBeritaLists from './_MainBeritaLists';
import GrafikInfoList from './_GrafikInfoList';

export async function generateMetadata({
  params: { domain },
}): Promise<Metadata> {
  const site = await getSiteData(domain);
  if (!site) notFound();
  return {
    title: site.name,
    description: site.organization_name,
  };
}
export default async function SiteIndexPage({ params: { domain } }) {
  const site = await getSiteData(domain);
  if (!site) notFound();
  return (
    <SiteLayout
      site={site}
      jumbotron={{
        title: site.name,
        subtitle: 'Pemerintah Kabupaten Bolaang Mongondow Selatan',
      }}
    >
      <section className="p-1 lg:p-2">
        <SwrBannerList
          swiper={{
            breakpoints: {},
          }}
        />
      </section>
      <section className="p-3 md:p-4 lg:py-8 lg:px-10 h-full grid grid-cols-1 gap-6 lg:grid-cols-[65%,30%] md:gap-[72px]">
        <div className="flex flex-col gap-7">
          <div className="flex w-full h-[38px]">
            <div className="border-b-[3px] border-primary">
              <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                Berita Terbaru
              </h1>
            </div>
            <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
          </div>
          <BeritaLists webId={site.id} />
        </div>
        <MainBeritaLists />
        <section className="w-full max-w-full">
          <div className="flex flex-col gap-7 lg:sticky lg:top-[70px]">
            <div className="w-full">
              <div className="flex w-full h-[38px] mb-6">
                <div className="border-b-[3px] border-primary">
                  <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                    Info Grafik Terbaru
                  </h1>
                </div>
                <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
              </div>
              <div className="px-0 lg:px-5 bg-primary-50 w-full rounded-lg">
                <GrafikInfoList />
              </div>
              {/* <UISwrResourceGrafikInfoWidget
                wrapperComponent={({ children }) => (
                  <div className="px-0 lg:px-5 bg-primary-50 w-full rounded-lg">
                    {children}
                  </div>
                )}
                paramsQuery={{ limit: 3 }}
                viewOptions={{
                  className: 'py-0 pt-5',
                  slideContainer: {
                    className: clsx(
                      `!bg-cover !bg-center`,
                      '!w-[300px] !h-[500px] lg:!w-full'
                    ),
                  },
                }}
              /> */}
            </div>
          </div>
        </section>
      </section>
    </SiteLayout>
  );
}
