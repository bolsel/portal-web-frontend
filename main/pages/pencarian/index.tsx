import BaseJumbotron from '../../components/base/jumbotron';
import { useRouter } from 'next/router';
import BaseBreadcrumb from '../../components/base/breadcrumb';
import Search from '../../components/search';

export default function PencarianPage() {
  const router = useRouter();
  const currentQuery = router.query.q;
  return (
    <main>
      <section>
        <BaseJumbotron
          title="Pencarian"
          subtitle="Temukan informasi di Portal Bolsel"
          breadcrumb={
            <BaseBreadcrumb
              items={[
                {
                  label: 'Beranda',
                  link: '/',
                },
                {
                  label: 'Pencarian',
                  link: `/pencarian?q=${currentQuery}`,
                  active: true,
                },
              ]}
            />
          }
        />
      </section>
      <Search currentSearchQuery={currentQuery as string} />
    </main>
  );
}
