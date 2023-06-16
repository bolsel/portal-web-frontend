import HomeHero from '../components/home-hero';
import NewsHomeTerkini from '../components/news/home-terkini';
import BannerInfoWidgetSwr from '../components/client/banner-info-widget-swr';
import GrafikInfoWidgetSwr from '../components/client/grafik-info-widget-swr';
import AplikasiListWidgetSwr from '../components/client/aplikasi-list-widget-swr';

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
        <BannerInfoWidgetSwr />
      </section>

      <section className="py-6 md:py-8 xl:py-12">
        <GrafikInfoWidgetSwr />
      </section>
      <AplikasiListWidgetSwr />
    </main>
  );
}

export default Index;
