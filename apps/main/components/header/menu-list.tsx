'use client';

import { UIBaseIcon } from '@portalweb/ui';
import { useState } from 'react';
import MenuItems from './menu-items';
import { useMainLayoutContext } from '../../components/main-layout-provider';
export default function MenuList() {
  const mainLayout = useMainLayoutContext();
  return (
    <>
      <div className="hidden lg:flex">
        <ul className="flex items-center gap-4 text-white">
          {mainLayout.menuList.map((m, index) => (
            <li key={index}>
              <button
                className="flex items-center gap-4 cursor-pointer px-3 py-1 rounded-lg hover:bg-primary-800 hover:bg-opacity-40"
                onClick={() => mainLayout.setHeaderCurrentMenu(m)}
              >
                <span className="font-roboto font-medium leading-7">
                  {m.title}
                </span>
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
      {/* <MobileMenu /> */}
    </>
  );
}
