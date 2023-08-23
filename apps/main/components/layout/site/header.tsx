'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { siteMenu } from './menu';
import { usePathname, useSearchParams } from 'next/navigation';
import { ApiResourceGetNormalizerType } from '@portalweb/api';
import { UIBaseIcon } from '@portalweb/ui';
import HeaderMobile from './header-mobile';

export default function Header({
  site,
}: {
  site: ApiResourceGetNormalizerType<'websites', 'byDomain'>;
}) {
  const [hasSub, setHasSub] = useState<number | null>(null);
  const [mobileShow, setMobileShow] = useState(false);

  const pathName = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setMobileShow(false);
    setHasSub(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, searchParams]);

  const menuItems = siteMenu(site);

  const SubItems = ({ menu }) => {
    return (
      <section className="hidden lg:block bg-primary w-full absolute top-full left-0 border-t border-primary-400">
        <div className="ui-container">
          <div className="flex mx-auto items-start pt-6 pb-10 bg-no-repeat">
            <div className="flex flex-col gap-8 flex-grow">
              {menu && (
                <ul
                  className={clsx(
                    'grid grid-cols-3 grid-rows-2 gap-y-6 gap-x-10'
                  )}
                >
                  {menu.map((m, index) => {
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
                            <UIBaseIcon
                              icon={m.icon}
                              fallback="menu-default"
                              className="w-full h-full"
                            />
                          </div>
                          <div className="w-full ml-4 group-hover:border-b-primary-900 rounded-lg group-hover:bg-opacity-40">
                            <h2 className="text-lg font-bold text-gray-50 mb-1">
                              {m.title}
                            </h2>
                            <div className="text-sm text-gray-50 font-menu opacity-80 line-clamp-1">
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
              onClick={() => setHasSub(null)}
            >
              <UIBaseIcon icon="close" className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    );
  };
  return (
    <>
      <Transition
        show={!mobileShow}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
      >
        <div className="group bg-white font-menu text-xs lg:text-lg uppercase font-bold">
          <div className="flex gap-2 justify-center items-center p-1">
            <Link href="/" className="flex gap-2 justify-center items-center">
              <Image
                alt="Logo"
                width={50}
                height={60}
                src={'/images/logo.png'}
                className={'h-8 w-7'}
              />
              <div className="leading-6 group-hover:text-primary flex flex-col">
                <div className="font-intro">{site.organization_name}</div>
              </div>
            </Link>
          </div>
        </div>
      </Transition>
      <HeaderMobile site={site} show={mobileShow} />
      <header className="bg-primary py-2 sticky top-0 z-20">
        <div className="ui-container">
          <nav className="hidden lg:flex items-center justify-center">
            <ul className="flex items-center justify-center gap-4 text-white font-menu">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-4 cursor-pointer px-3 py-1 rounded-lg hover:bg-primary-800 hover:bg-opacity-40"
                >
                  <UIBaseIcon
                    icon="home"
                    className="w-5 h-5 font-bold"
                    aria-hidden="true"
                  />
                  <span className="font-menu font-medium leading-7">
                    Beranda
                  </span>
                </Link>
              </li>
              {menuItems.map((menu, index) => {
                const LinkComp = ({ children, ...props }) => {
                  if (menu.items) {
                    return (
                      <button {...props} onClick={() => setHasSub(index)}>
                        {children}
                      </button>
                    );
                  }
                  return (
                    <Link href={menu.link} {...props}>
                      {children}
                    </Link>
                  );
                };
                return (
                  <li key={index}>
                    <LinkComp className="flex items-center gap-4 cursor-pointer px-3 py-1 rounded-lg hover:bg-primary-800 hover:bg-opacity-40">
                      <span className="font-menu font-medium leading-7">
                        {menu.title}
                      </span>
                      {menu.items && (
                        <UIBaseIcon
                          icon="chevron-down"
                          className="w-5 h-5 font-bold"
                          aria-hidden="true"
                        />
                      )}
                    </LinkComp>
                  </li>
                );
              })}
            </ul>
          </nav>
          <nav className="flex lg:hidden items-end justify-end">
            <div className="min-w-0 flex gap-4">
              <button
                className="w-7 h-7 flex items-center justify-center"
                onClick={() => setMobileShow(!mobileShow)}
              >
                {!mobileShow ? (
                  <UIBaseIcon
                    icon="menu"
                    className="w-full h-full text-white"
                  />
                ) : (
                  <UIBaseIcon
                    icon="close"
                    className="w-full h-full text-white"
                  />
                )}
                <span className="sr-only">
                  {mobileShow ? 'Tutup Menu' : 'Buka Menu'}
                </span>
              </button>
            </div>
          </nav>
        </div>
        {hasSub !== null ? <SubItems menu={menuItems[hasSub].items} /> : null}
      </header>
    </>
  );
}