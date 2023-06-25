import HomeHero from '../components/home-hero';
import NewsHomeTerkini from '../components/news/home-terkini';
import AplikasiListWidgetSwr from '../components/client/aplikasi-list-widget-swr';
import LibSwrBannerInfoWidget from '../../_libs/components/swr/banner-info-widget';
import LibSwrGrafikInfoWidget from '../../_libs/components/swr/grafik-info-widget';

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
        <LibSwrBannerInfoWidget
          viewOptions={{}}
          wrapperComponent={({ children }) => (
            <div className="container mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6">
              {children}
            </div>
          )}
        />
      </section>

      <section className="py-6 md:py-8 xl:py-12">
        <LibSwrGrafikInfoWidget
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
      <AplikasiListWidgetSwr />
    </main>
  );
}

export default Index;
