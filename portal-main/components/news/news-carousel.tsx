import {DataListWithMeta} from "@portal-web/shared-api";
import Link from "next/link";
import {ComponentProps, ComponentPropsWithoutRef, FC} from "react";
import clsx from "clsx";
import {trimSlashes} from "@portal-web/shared-base";
import {UICarousel, UICarouselContentComponent, UIIcon} from "@portal-web/shared-ui";


export type NewsCarouselProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  pathRead?: string
}
export const NewsCarousel: FC<NewsCarouselProps & { data: DataListWithMeta | undefined }> = (
  {
    className,
    pathRead,
    data,
    ...props
  }
) => {
  pathRead = pathRead ? trimSlashes(pathRead) : '/berita/'
  const itemsNormalize = () => {
    if (!data) return [];
    if (!data.data) return [];
    return data.data.map((item, i) => ({
      image: item.image_cover.url,
      ...item
    }))
  }
  const Content: UICarouselContentComponent = (
    {
      next,
      prev,
      item,
      currentIndex,
      items,
    }
  ) => {
    return (
      <div
        className="ui-news-carousel visible inline-block h-[67%] md:h-[50%] absolute bottom-0 w-full bg-black
          bg-opacity-50 transition duration-500 ease-in-out group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg
          rounded-lg px-8 py-6 text-white"
      >
        <div className="flex flex-col h-full justify-between">
          <div
            className="md:hidden flex items-center justify-between py-2 px-3 rounded-full bg-white bg-opacity-20 mb-4">
            <button
              className="cursor-pointer"
              aria-label="Berita Sebelumnya"
              onClick={prev}
            >
              <UIIcon icon="base:chevron-left" aria-hidden="true"/>
            </button>
            <p className="text-sm text-white">
              <span className="font-bold mr-1">{currentIndex + 1}</span>dari{' '}
              {items.length}
            </p>
            <button
              className="cursor-pointer"
              aria-label="Berita Selanjutnya"
              onClick={next}
            >
              <UIIcon icon="base:chevron-right" aria-hidden="true"/>
            </button>
          </div>

          <div className="flex-grow">
            <p className="font-roboto text-sm uppercase leading-relaxed tracking-wider opacity-80 mb-1">
              {item.category.name}
            </p>
            <Link href={`${pathRead}${item.slug}`}>
              <h2
                title={item.title}
                className="line-clamp-3 md:line-clamp-2 font-intro font-bold text-xl md:text-2xl leading-9 md:leading-10 max-h-[108px] md:max-h-[90px] mb-3">
                {item.title}
              </h2>
            </Link>
            <div className="flex flex-col md:flex-row gap-2 opacity-60 text-xs">
              <p className="flex items-center gap-2 md:pr-2" title="Diterbitkan">
                <UIIcon
                  icon="base:calendar"
                  className="w-4 h-4"
                  aria-hidden="true"
                />
                <span className="sr-only">Diterbitkan pada</span>
                <span>{item.publish_date_format}</span>
              </p>
            </div>
          </div>

          <div className="md:flex justify-between items-center">
            <Link href={`${pathRead}${item.slug}`} tabIndex={-1}>
              <button
                type="button"
                className="w-full text-sm border border-white border-opacity-30 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                Baca Selengkapnya
              </button>
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <button
                className="cursor-pointer"
                aria-label="Berita Sebelumnya"
                onClick={prev}
              >
                <UIIcon
                  icon="base:chevron-left"
                  // size="10px"
                  aria-hidden="true"
                />
              </button>
              <p className="text-sm text-gray-500">
              <span className="font-bold text-white mr-1">
                {currentIndex + 1}
              </span>
                dari {items.length}
              </p>
              <button
                className="cursor-pointer"
                aria-label="Berita Sebelumnya"
                onClick={next}
              >
                <UIIcon
                  icon="base:chevron-right"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div
    className={clsx(
      "ui-news-latest-carousel w-full h-[536px] rounded-lg overflow-hidden",
      className
    )}
    {...props}
  >
    <UICarousel
      hoverAnimate={true}
      pauseOnHover={true}
      items={itemsNormalize()}
      content={Content}
    />
  </div>
}
