import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import LayoutDefaultHeaderMenu from './header-menu';
import { useLayoutDefaultContext } from './context';
import { useRouter } from 'next/router';
import BaseLogo from '../base/logo';
import LayoutDefaultHeaderMobile from './header-mobile';
import { UIContainer } from '@portal-web/shared-ui';

export default function LayoutDefaultHeader() {
  const layoutData = useLayoutDefaultContext();

  const [windowScrollY, setWindowScrollY] = useState(0);
  const onScroll = useCallback((event) => {
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
  const router = useRouter();
  useEffect(() => {
    layoutData.setCurrentMenu?.(null);
  }, [router.asPath]);
  return (
    <header
      className={clsx('', {
        'has-bg': windowScrollY > 600 || layoutData.currentMenu,
      })}
    >
      <UIContainer>
        <nav className="flex items-center">
          <Link
            href="/"
            className="mr-auto w-auto h-8 lg:h-[38px] flex gap-3"
            aria-label="Beranda"
          >
            <BaseLogo />
          </Link>
          <LayoutDefaultHeaderMenu />
          <LayoutDefaultHeaderMobile />
        </nav>
      </UIContainer>
    </header>
  );
}
