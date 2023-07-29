'use client';

import { UIBaseIcon } from '@portalweb/ui';
import { useState } from 'react';
import MenuItems from './menu-items';
import { useMainLayoutContext } from '../../components/main-layout-provider';

const MobileMenu = () => {
  const { mobileMenuShow, setMobileMenuShow } = useMainLayoutContext();
  return (
    <div className="lg:hidden">
      <div className="min-w-0 flex gap-4">
        <button
          className="w-7 h-7 flex items-center justify-center"
          onClick={() => setMobileMenuShow?.(!mobileMenuShow)}
        >
          {!mobileMenuShow ? (
            <UIBaseIcon icon="menu" className="w-full h-full text-white" />
          ) : (
            <UIBaseIcon icon="close" className="w-full h-full text-white" />
          )}
          <span className="sr-only">
            {mobileMenuShow ? 'Tutup Menu' : 'Buka Menu'}
          </span>
        </button>
      </div>
    </div>
  );
};
export default function MenuList() {
  const mainLayout = useMainLayoutContext();
  return (
    <>
      <div className="hidden lg:flex font-menu">
        <ul className="flex items-center gap-4 text-white">
          {mainLayout.menuList.map((m, index) => (
            <li key={index}>
              <button
                className="flex items-center gap-4 cursor-pointer px-3 py-1 rounded-lg hover:bg-primary-800 hover:bg-opacity-40"
                onClick={() => mainLayout.setHeaderCurrentMenu(m)}
              >
                <span className="font-medium leading-7">{m.title}</span>
                <UIBaseIcon
                  icon="chevron-down"
                  className="w-5 h-5 font-bold"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
        {mainLayout.headerCurrentMenu && <MenuItems />}
      </div>
      <MobileMenu />
    </>
  );
}
