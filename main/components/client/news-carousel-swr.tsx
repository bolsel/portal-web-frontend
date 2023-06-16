'use client';

import { FC } from 'react';
import { ApiResourceProps, useResourceSWR } from '@portal-web/shared-api';
import { NewsCarousel, NewsCarouselProps } from '../news/news-carousel';
import { UISwrComponent } from '@portal-web/shared-ui';

export const NewsCarouselSwr: FC<
  NewsCarouselProps & ApiResourceProps<'news'>
> = ({ pathQuery, paramsQuery, ...props }) => {
  const swrData = useResourceSWR('news', {
    pathQuery: pathQuery ?? ['latest'],
    paramsQuery: paramsQuery ?? {
      limit: 5,
    },
  });
  return (
    <UISwrComponent
      loadingComponent={() => (
        <div className="bg-base-200 animate-pulse w-full h-full"></div>
      )}
      noItemsComponent={() => (
        <div className="bg-base-200 w-full h-full">Tidak ada data</div>
      )}
      swrData={swrData}
    >
      {(data) => {
        return <NewsCarousel data={data} {...props} />;
      }}
    </UISwrComponent>
  );
  // return <NewsCarousel
  //   data={data}
  //   {...props}
  // />
};
