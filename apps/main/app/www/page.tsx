import HomeHero from '../../components/home-hero/home-hero';
import Link from 'next/link';
import HomeBannerInfoList from '#/main/components/home-banner-info-list';
import HomeGrafikInfoList from '#/main/components/home-grafik-info-list';
import HomeApplicationList from '#/main/components/home-application-list';
import HomeNewsHeadline from '#/main/components/home-news-headline';

export default async function MainIndexPage() {
  return (
    <main className="w-full overflow-hidden">
      <HomeHero />
      <HomeNewsHeadline />

      <section className="py-6 md:py-8 xl:py-12">
        <div className="container mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6">
          <HomeBannerInfoList />
        </div>
      </section>

      <section className="py-6 md:py-8 xl:py-12">
        <div className="container bg-gray-200 mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6 rounded-lg">
          <HomeGrafikInfoList />
        </div>
      </section>
      <section className="ui-container mb-10">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 mb-8">
          <h2 className="font-medium text-[28px] md:text-4xl leading-loose">
            Aplikasi
          </h2>
          <div className="flex-1 flex justify-center flex-col text-center">
            <div className="border-b border-gray-300" />
          </div>
          <Link href="/aplikasi" tabIndex={-1}>
            <button
              className="btn btn-sm btn-outline btn-primary normal-case"
              type="button"
            >
              Lihat Semua Aplikasi
            </button>
          </Link>
        </div>
        <HomeApplicationList />
      </section>
    </main>
  );
}
