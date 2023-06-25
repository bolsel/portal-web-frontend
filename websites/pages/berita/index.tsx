import { serverSideHost } from '../../src/server';
import React from 'react';
import LibSwrNewsItems from '../../../_libs/components/swr/news-items';
import Link from 'next/link';
import LibBaseTitleWidget from '../../../_libs/components/base/title-widget';

export async function getServerSideProps(context) {
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
  return {
    props: {
      website,
      title: 'Berita',
      subTitle: `Berita ${website.organization.name}`,
    },
  };
}

export default function BeritaIndexPage(props) {
  const { website } = props;
  return (
    <main>
      <div className="px-5">
        <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[60%,auto] xl:gap-[72px]">
          <div className="flex flex-col gap-7 p-5">
            <LibSwrNewsItems
              websiteId={website.id}
              paramsQuery={{ limit: 10 }}
              listOptions={{
                viewType: 'grid',
              }}
            />
          </div>
          <section className="my-5">
            <div className="flex flex-col gap-2 lg:sticky lg:top-[88px]">
              <LibBaseTitleWidget text="Berita Di Portal Bolsel" />
              <LibSwrNewsItems
                paramsQuery={{ limit: 5 }}
                hideNavigation
                listOptions={{
                  hideViewSwitch: true,
                  viewType: 'list',
                  itemOptions: {
                    small: true,
                    customComponent: {
                      description() {
                        return null;
                      },
                    },
                    urlRead(data) {
                      return `https://www.bolselkab.go.id/berita/${data.slug}`;
                    },
                    linkProps: () => ({
                      target: '_blank',
                    }),
                  },
                }}
              />

              <div className="mt-5 flex items-center justify-center">
                <Link
                  href="https://www.bolselkab.go.id/berita"
                  target="_blank"
                  className="btn btn-primary btn-sm normal-case"
                >
                  Berita Portal Bolsel
                </Link>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
