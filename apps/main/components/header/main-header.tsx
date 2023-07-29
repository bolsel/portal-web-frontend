'use client';

import Link from 'next/link';
import BaseLogo from '../base/logo';
import MenuList from './menu-list';
import clsx from 'clsx';
import { useMainLayoutContext } from '../main-layout-provider';
import { useCallback, useEffect, useState } from 'react';
import HeaderMobile from './header-mobile';
import { usePathname, useParams, useSearchParams } from 'next/navigation';

export default function HeaderMain() {
  const mainLayout = useMainLayoutContext();
  const [windowScrollY, setWindowScrollY] = useState(0);
  const onScroll = useCallback(() => {
    const { scrollY } = window;
    setWindowScrollY(scrollY);
  }, []);
  useEffect(() => {
    //add eventlistener to window
    window.addEventListener('scroll', onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
  const pathName = usePathname()
  const searchParams = useSearchParams();
  useEffect(() => {
    mainLayout.setHeaderCurrentMenu(null);
    mainLayout.setMobileMenuShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, searchParams])


  return (
    <header
      className={clsx({
        'bg-primary': windowScrollY > 600 || mainLayout.headerCurrentMenu,
      })}
    >
      <div className="ui-container">
        <nav className="flex items-center">
          <Link
            href="/"
            className="mr-auto w-auto h-8 lg:h-[38px] flex gap-3"
            aria-label="Beranda"
          >
            <BaseLogo />
          </Link>
          <MenuList />
          <HeaderMobile />
        </nav>
      </div>
    </header>
  );
}
