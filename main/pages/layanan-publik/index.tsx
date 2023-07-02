import BaseJumbotron from '../../components/base/jumbotron';
import BaseBreadcrumb from '../../components/base/breadcrumb';
import {
  UIContainer,
  UISwrResourcePublicServiceListItems,
} from '@portal-web/shared-ui';

export default function LayananPublikPage() {
  return (
    <main className="overflow-hidden">
      <section>
        <BaseJumbotron
          title="Layanan Publik"
          subtitle="Informasi layanan publik yang ada di Bolsel"
          metaData
          breadcrumb={
            <BaseBreadcrumb
              items={[
                {
                  label: 'Beranda',
                  link: '/',
                },
                {
                  label: 'Layanan Publik',
                  link: '',
                  active: true,
                },
              ]}
            />
          }
        />
      </section>
      <section className="w-full bg-gray-200">
        <UIContainer className="relative -top-24 z-20">
          <div className="bg-white p-3 md:p-4 lg:p-6 xl:px-10 xl:py-8 rounded-xl shadow ">
            <div>
              <div className="w-full min-w-0 flex flex-col gap-6 ">
                <UISwrResourcePublicServiceListItems />
              </div>
            </div>
          </div>
        </UIContainer>
      </section>
    </main>
  );
}
