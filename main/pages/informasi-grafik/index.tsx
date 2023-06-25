import BaseJumbotron from '../../components/base/jumbotron';
import BaseBreadcrumb from '../../components/base/breadcrumb';
import { UIContainer } from '@portal-web/shared-ui';
import LibPageGrafikInfo from '../../../_libs/components/page/grafik-info-page';

export default function InformasiGrafikIndexPage({ page }) {
  return (
    <main>
      <section>
        <BaseJumbotron
          title="Informasi Grafik"
          subtitle="Lihat semua informasi grafik"
          metaData
          breadcrumb={
            <BaseBreadcrumb
              items={[
                {
                  label: 'Beranda',
                  link: '/',
                },
                {
                  label: 'Informasi Grafik',
                  link: '/informasi-grafik',
                  active: true,
                },
              ]}
            />
          }
        />
      </section>
      <section className="w-full bg-gray-200">
        <UIContainer className="relative -top-24 z-20">
          <div className="p-3 md:p-6 lg:py-8 lg:px-10 rounded-xl bg-white">
            <LibPageGrafikInfo />
          </div>
        </UIContainer>
      </section>
    </main>
  );
}
