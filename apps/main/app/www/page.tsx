import HomeNewsHeadline from '../../components/home-news-headline/home-news-headline';
import HomeHero from '../../components/home-hero/home-hero';
import AplikasiList from './_AplikasiList';
import Link from 'next/link';
import BannerList from './_BannerList';
import GrafikInfoList from './_GrafikInfoList';

export default async function MainIndexPage() {
  return (
    <main className="w-full overflow-hidden">
      <HomeHero />
      <HomeNewsHeadline />

      <section className="py-6 md:py-8 xl:py-12">
        <div className="container mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6">
          <BannerList />
        </div>
      </section>

      <section className="py-6 md:py-8 xl:py-12">
        <div className="container bg-gray-200 mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6 rounded-lg">
          <GrafikInfoList />
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
        <AplikasiList />
      </section>
    </main>
  );
}
