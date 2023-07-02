import { serverSideHost } from '../../src/server';
import { OrganizationDocumentsResource } from '@portal-web/shared-api/server';
import Head from 'next/head';
import { useState } from 'react';
import { UIViewDocumentItemDetail } from '@portal-web/shared-ui';
import { documentIcon, publicUrl } from '@portal-web/shared-base';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const website = await serverSideHost(context);
  if (!website) {
    return {
      redirect: {
        permanent: false,
        destination: '/404-website',
      },
      props: {},
    };
  }
  try {
    const data = await new OrganizationDocumentsResource().apiResourceFetch({
      pathQuery: ['bySlug', slug],
    });
    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data,
        website,
        title: data.title,
        subTitle: data.description,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default function DokumenSlugPage(props) {
  const { data } = props;
  const [show, setShow] = useState(false);
  const imageShare = publicUrl(documentIcon(data.file.type));
  const documentDetailUrl = publicUrl(`/dokumen/${data.slug}`);

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="title" content={data.title} />
        <meta name="description" content={data.description} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={documentDetailUrl} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={imageShare} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={documentDetailUrl} />
        <meta property="twitter:title" content={data.title} />
        <meta property="twitter:description" content={data.description} />
        <meta property="twitter:image" content={imageShare} />
      </Head>
      <div className="p-3 md:p-4 lg:py-8 lg:px-10 w-full xl:grid xl:grid-cols-[1fr,360px] xl:grid-rows-[auto,1fr] lg:gap-6">
        <div className="mb-5 lg:mb-0 w-full h-[80vh]">
          {data.file.type === 'application/pdf' ? (
            show ? (
              <iframe
                src={data.file.url}
                className="w-full h-full rounded-lg"
              ></iframe>
            ) : (
              <div className="w-full h-full bg-base-200 rounded-lg flex justify-center items-center">
                <button
                  onClick={() => setShow(true)}
                  className="btn btn-primary"
                >
                  Lihat Dokumen
                </button>
              </div>
            )
          ) : (
            <div className="w-full h-full bg-base-200 rounded-lg flex justify-center items-center">
              Hanya Dokumen jenis PDF yang bisa dilihat langsung
            </div>
          )}
        </div>

        <div className="">
          <div className="flex flex-col gap-7 lg:sticky lg:top-[88px]">
            <UIViewDocumentItemDetail data={data} downloadLink />
          </div>
        </div>
      </div>
    </>
  );
}
