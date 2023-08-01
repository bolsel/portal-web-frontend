import { ReactNode } from 'react';
import Header from './header';
import { getSiteData } from '../../../lib/site';
import Footer from './footer';
import '../../../styles/globals.css';
import { ApiResourceGetNormalizerType } from '@portalweb/api';
import Jumbotron, { JumbotronProps } from './jumbotron';

export default async function SiteLayout({
  children,
  site,
  jumbotron,
}: {
  children: ReactNode;
  site: ApiResourceGetNormalizerType<'websites', 'byDomain'>;
  jumbotron?: JumbotronProps;
}) {
  return (
    <div>
      <Header site={site} />
      <main>
        {jumbotron ? <Jumbotron {...jumbotron} /> : null}

        <section className="w-full bg-gray-200">
          <div className="relative -top-24 z-10 ">
            <div className="ui-container">
              <div className="bg-white min-h-screen rounded-xl">{children}</div>
            </div>
          </div>
        </section>
      </main>
      <Footer site={site} />
    </div>
  );
}
