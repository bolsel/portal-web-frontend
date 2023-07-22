import { Metadata } from 'next';
import Lists from './_Lists';
import Headline from './_Headline';
import CategorySwiper from './_CategorySwiper';
import PopulerSide from './_PopulerSide';

export const metadata: Metadata = {
  title: 'Berita Bolsel',
  description: 'Berita Pemerintah Kabupaten Bolaang Mongondow Selatan',
};
export default function MainBeritaIndexPage(props) {
  return (
    <main className="">
      <section className="relative">
        <Headline />
      </section>
      <section className="py-4 border-b border-primary-200 overflow-hidden mb-6">
        <CategorySwiper />
      </section>
      <div className="ui-container mb-5 mx-auto grid grid-cols-1 gap-2 lg:gap-8 lg:grid-cols-[60%,auto]">
        <section className="mb-5 w-full flex flex-col bg-white rounded-md p-3 shadow">
          <Lists />
        </section>
        <div className="">
          <div className="sticky top-[88px] bg-white p-3 shadow rounded-md">
            <PopulerSide />
          </div>
        </div>
      </div>
    </main>
  );
}
