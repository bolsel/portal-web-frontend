import { notFound } from 'next/navigation';

export default async function BeritaSlugPage({ params }) {
  if (params.slug === 'a') return notFound();
  return <div>a</div>;
}
