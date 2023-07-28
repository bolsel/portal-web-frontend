import { apiResourcePublicServices } from '@portalweb/api/server';
import PageWithContainer from '../../../../components/pages/page-with-container';
import { notFound } from 'next/navigation';

export default async function MainLayananPublikSlugPage({ params: { slug } }) {
  const item = await apiResourcePublicServices()
    .fetch({
      pathQuery: ['bySlug', slug],
    })
    .catch(() => null);
  if (!item) return notFound();

  return (
    <PageWithContainer
      jumbotron={{
        title: 'Layanan Publik',
        subtitle: 'Informasi layanan publik yang ada di Bolsel',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Layanan Publik',
            link: '/layanan-publik',
          },
        ],
      }}
    >
      <div className="w-full grid grid-cols-1"></div>
    </PageWithContainer>
  );
}
