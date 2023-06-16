import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';

import clsx from 'clsx';
import 'swiper/css/bundle';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useResourceSWR } from '@portal-web/shared-api';
import { UIContainer, UISwrComponent } from '@portal-web/shared-ui';

const Skeleton = () => {
  const items: any = [];
  for (let i = 0; i < 6; i++) {
    items.push(
      <SwiperSlide>
        <div
          key={i}
          className="w-[150px] bg-gray-200 animate-pulse rounded-full"
        />
      </SwiperSlide>
    );
  }
  return <>{items}</>;
};
export default function NewsListCategoriesSwiper() {
  const swrData = useResourceSWR('news_categories', {});
  const router = useRouter();
  const categoryActive = router.query.kategori;
  return (
    <UISwrComponent
      loadingComponent={Skeleton}
      noItemsComponent={() => <div>asa</div>}
      swrData={swrData}
      wrapperComponent={({ children }) => <UIContainer>{children}</UIContainer>}
    >
      {(data) => {
        return (
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
                        'bg-primary text-white font-bold':
                          categoryActive === '' || categoryActive === undefined,
                      }
                    )}
                  >
                    Terbaru
                  </button>
                </Link>
              </SwiperSlide>
              {data &&
                data.data &&
                data.data.map((item, index) => (
                  <SwiperSlide className="!w-[fit-content]" key={index}>
                    <Link href={`/berita/?kategori=${item.slug}`}>
                      <button
                        className={clsx(
                          'px-6 py-2 rounded-full font-roboto uppercase cursor-pointer hover:bg-primary hover:text-white text-gray-600',
                          {
                            'bg-primary text-white font-bold':
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
        );
      }}
    </UISwrComponent>
  );
}
