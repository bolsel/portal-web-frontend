import { useLayoutDefaultContext } from './context';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { UIContainer, UIIcon } from '@portal-web/shared-ui';
import { Icon, iconExists } from '@iconify/react';

const MobileMenu = () => {
  const { mobileMenuShow, setMobileMenuShow } = useLayoutDefaultContext();
  return (
    <div className="lg:hidden">
      <div className="min-w-0 flex gap-4">
        <button
          className="w-7 h-7 flex items-center justify-center"
          onClick={() => setMobileMenuShow?.(!mobileMenuShow)}
        >
          {!mobileMenuShow ? (
            <UIIcon icon="base:menu" className="w-full h-full text-white" />
          ) : (
            <UIIcon icon="base:close" className="w-full h-full text-white" />
          )}
          {/*<BaseIcon*/}
          {/*  v-show="!open"*/}
          {/*  icon="icons/hamburger.svg"*/}
          {/*:size="24"*/}
          {/*fill-color="white"*/}
          {/*/>*/}
          <span className="sr-only">
            {mobileMenuShow ? 'Tutup Menu' : 'Buka Menu'}
          </span>
        </button>
      </div>
    </div>
  );
};

const ImageWithFallback = (props) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

function MenuIcon({ icon, ...props }) {
  return <UIIcon {...props} icon={`${icon}`} />;
}

const MenuItems = () => {
  const layoutData = useLayoutDefaultContext();
  const menu = layoutData.currentMenu;

  return (
    <section className="bg-primary w-full absolute top-full left-0 border-t border-primary-400">
      <UIContainer>
        <div className="flex mx-auto items-start pt-6 pb-10 bg-no-repeat">
          <div className="flex flex-col gap-8 flex-grow">
            {menu.link ? (
              <Link
                href={menu.link}
                className="text-white font-roboto font-medium text-3xl leading-10"
              >
                {menu.title}
              </Link>
            ) : (
              <h1 className="text-white font-roboto font-medium text-3xl leading-10">
                {menu.title}
              </h1>
            )}
            {menu.items && (
              <ul
                className={clsx(
                  'grid grid-cols-3 grid-rows-2 gap-y-6 gap-x-10',
                  { 'grid-flow-col': menu.items.length <= 3 }
                )}
              >
                {menu.items.map((m, index) => {
                  const ImgComponent = m.slug ? ImageWithFallback : Image;
                  return (
                    <li
                      key={index}
                      className="group hover:bg-primary-700 rounded-lg hover:bg-opacity-40"
                    >
                      <Link
                        href={m.link}
                        target={
                          m.link.startsWith('http') ||
                          m.link.startsWith('https')
                            ? '_blank'
                            : '_self'
                        }
                        className="flex items-start"
                        title={m.description}
                      >
                        <div className="w-2/12 mt-1.5 group-hover:transform group-hover:-scale-x-110 group-hover:scale-y-110 bg-primary-100 rounded-box text-primary p-2">
                          <MenuIcon icon={m.icon} className="w-full h-full" />
                        </div>
                        <div className="w-full ml-4 group-hover:border-b-primary-900 rounded-lg group-hover:bg-opacity-40">
                          <h2 className="text-lg font-bold text-gray-50 mb-1">
                            {m.title}
                          </h2>
                          <div className="text-sm text-gray-50 font-roboto opacity-80 line-clamp-1">
                            {m.description}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <button
            className="ml-3 hover:bg-primary-500 hover:rounded-lg"
            title="Tutup Menu Navigasi"
            onClick={() => layoutData.setCurrentMenu?.(null)}
          >
            <UIIcon icon="base:close" className="text-white w-6 h-6" />
          </button>
        </div>
      </UIContainer>
    </section>
  );
};
export default function LayoutDefaultHeaderMenu() {
  const layoutData = useLayoutDefaultContext();
  return (
    <>
      <div className="hidden lg:flex">
        <ul className="flex items-center gap-4 text-white">
          {layoutData.menuList.map((m, index) => (
            <li key={index}>
              <button
                className="flex items-center gap-4 cursor-pointer px-3 py-1 rounded-lg hover:bg-primary-800 hover:bg-opacity-40"
                onClick={() => layoutData.setCurrentMenu?.(m)}
              >
                <span className="font-roboto font-medium leading-7">
                  {m.title}
                </span>
                <UIIcon
                  icon="base:chevron-down"
                  className="w-5 h-5 font-bold"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
        {layoutData.currentMenu && <MenuItems />}
      </div>
      <MobileMenu />
    </>
  );
}
