'use client';

import { UISwrResource } from '@portalweb/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import Link from 'next/link';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

const Skeleton = () => {
  const items: any = [];
  for (let i = 0; i < 6; i++) {
    items.push(
      <SwiperSlide key={i}>
        <div className="w-[150px] bg-gray-200 animate-pulse rounded-full" />
      </SwiperSlide>
    );
  }
  return <>{items}</>;
};
export default function CategorySwiper() {
  const searchParams = useSearchParams();
  const categoryActive = searchParams.get('kategori');
  return (
    <UISwrResource
      resourceKey={'news_categories'}
      pathQuery={['listSimple']}
      loadingComponent={Skeleton}
    >
      {({ data }) => {
        return (
          <div className="ui-container">
            <Swiper
              slidesPerView="auto"
              spaceBetween={64}
              passiveListeners={true}
              mousewheel={true}
              modules={[Mousewheel]}
            >
              <>
                <SwiperSlide className="!w-[fit-content]">
                  <Link href="/berita">
                    <button
                      className={clsx(
                        'px-6 py-2 rounded-full font-roboto uppercase cursor-pointer hover:bg-primary hover:text-white text-gray-600',
                        {
                          'bg-primary text-white': !categoryActive,
                        }
                      )}
                    >
                      Terbaru
                    </button>
                  </Link>
                </SwiperSlide>

                {data?.data.map((item, index) => (
                  <SwiperSlide className="!w-[fit-content]" key={index}>
                    <Link href={`/berita/?kategori=${item.slug}`}>
                      <button
                        className={clsx(
                          'px-6 py-2 rounded-full font-roboto uppercase cursor-pointer hover:bg-primary hover:text-white text-gray-600',
                          {
                            'bg-primary text-white':
                              categoryActive === item.slug,
                          }
                        )}
                      >
                        {item.name}
                      </button>
                    </Link>
                  </SwiperSlide>
                ))}
              </>
            </Swiper>
          </div>
        );
      }}
    </UISwrResource>
  );
}
