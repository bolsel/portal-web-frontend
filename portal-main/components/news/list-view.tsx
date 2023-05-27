import clsx from "clsx";
import Link from "next/link";
import {FC, ReactElement} from "react";
import {trimSlashes} from "@portal-web/shared-base";
import { UINextImageBlur, UIPaginationProps} from "@portal-web/shared-ui";

type ComponentType = FC<{ item: Record<string, any>, index: number }>
export type NewsListViewProps = {
  items:Record<string,any>[]
  pathRead?: string // contoh /berita/
  titleComponent?: ComponentType,
  imageComponent?: ComponentType | false,
  small?: boolean,
  header?: ReactElement
  footer?: ReactElement
  pagination?:UIPaginationProps
}
export const NewsListView: FC<NewsListViewProps> = (
  {
    items,
    pathRead,
    titleComponent,
    imageComponent,
    small,
    pagination,
    header,
    footer,
  }) => {
  pathRead = pathRead ? trimSlashes(pathRead) : '/berita/'

  return (
    <div className="flex flex-col lg:top-[88px]">
      <div>{header && header}</div>
      <div className="w-full min-h-[540px]">
        <div className="flex-auto w-full flex flex-col gap-5 md:gap-6">
          {items.map((item,index)=><article
            key={index}
            className={clsx(
              'min-h-[88px] flex overflow-hidden w-full gap-4 border-4 border-transparent rounded-xl',
              'group hover:bg-base-200/20 p-1 transition-colors ease-brand duration-250',
              {'!min-h-[88px]': small}
            )}
          >
            {imageComponent !== false ? imageComponent ? imageComponent({item, index}) :
                <div
                  className={clsx(
                    'flex-shrink-0 w-[72px] h-[72px] md:w-[200px] md:h-[130px] overflow-hidden rounded-lg transition-transform duration-300 ease-in-out',
                    {
                      '!w-[72px] !h-[72px]': small,
                    }
                  )}
                >
                  <Link href={`${pathRead}${item.slug}`}>
                    <UINextImageBlur
                      src={item.image_cover.url}
                      alt={item.title}
                      width={72}
                      height={72}
                      className="w-full h-full block transition-transform object-center object-cover duration-300 ease-in-out group-hover:transform group-hover:scale-125"
                    />
                  </Link>

                </div>
              : null}

            <div className="w-full flex flex-col items-start justify-center">
              <Link href={`${pathRead}${item.slug}`}>
                {titleComponent ? titleComponent({item, index}) : <h2
                  className="text-base md:text-lg cursor-pointer font-lato font-medium text-neutral mb-2 group-hover:text-primary line-clamp-2">
                  {item.title}
                </h2>}
              </Link>
              {/*<div className="hidden text-sm font-lato text-gray-600 mb-2 group-hover:text-primary lg:line-clamp-2">*/}
              {/*  {item.description}*/}
              {/*</div>*/}
              <div className="font-normal text-xs leading-5 text-neutral/70">
                <span className="group-hover:text-neutral capitalize">
                  {item.category.name}
                </span>
                <span className="mx-1">|</span>
                <span className='group-hover:text-neutral'>{item.publish_date_format}</span>
              </div>
            </div>
          </article>)}
        </div>
      </div>
      <div className="w-full">{footer && footer}</div>
    </div>
  )
}
