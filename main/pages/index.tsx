import Link from 'next/link';
import HomeHero from '../components/home-hero';
import NewsHomeTerkini from '../components/news/home-terkini';
import {
  UIContainer,
  UISwrResourceBannerInfoWidget,
  UISwrResourceGrafikInfoWidget,
} from '@portal-web/shared-ui';
import { UISwrResourceApplicationListWidget } from '@portal-web/shared-ui';

export function Index() {
  return (
    <main className="overflow-hidden">
      <HomeHero />
      <section
        className="relative top-[-12rem] mb-[-12rem] md:top-[-14rem] md:mb-[-14rem]
      lg:-top-40 lg:-mb-40 z-10 pb-6 md:pb-8 xl:pb-12"
      >
        <NewsHomeTerkini />
      </section>
      <section className="py-6 md:py-8 xl:py-12">
        <UISwrResourceBannerInfoWidget
          wrapperComponent={({ children }) => (
            <div className="container mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6">
              {children}
            </div>
          )}
        />
      </section>

      <section className="py-6 md:py-8 xl:py-12">
        <UISwrResourceGrafikInfoWidget
          paramsQuery={{ limit: 7 }}
          wrapperComponent={({ children }) => (
            <div className="container bg-gray-200 mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6 rounded-lg">
              {children}
            </div>
          )}
          viewOptions={{
            className: 'pt-[50px]',
          }}
        />
      </section>
      <UIContainer className="relative">
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
        <UISwrResourceApplicationListWidget
          wrapperComponent={({ children }) => (
            <UIContainer>{children}</UIContainer>
          )}
        />
      </UIContainer>
    </main>
  );
}

export default Index;
