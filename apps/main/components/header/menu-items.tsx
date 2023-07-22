'use client';

import { UIBaseIcon } from '@portalweb/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { useMainLayoutContext } from '../main-layout-provider';

export default function MenuItems() {
  const mainLayout = useMainLayoutContext();
  const menu = mainLayout.headerCurrentMenu;
  return (
    <section className="bg-primary w-full absolute top-full left-0 border-t border-primary-400">
      <div className="ui-container">
        <div className="flex mx-auto items-start pt-6 pb-10 bg-no-repeat">
          <div className="flex flex-col gap-8 flex-grow">
            {menu.link ? (
              <Link
                href={menu.link}
                className="text-white font-roboto font-medium text-3xl leading-10"
                onClick={() => mainLayout.setHeaderCurrentMenu(null)}
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
                  return (
                    <li
                      key={index}
                      className="group hover:bg-primary-700 rounded-lg hover:bg-opacity-40"
                      onClick={() => mainLayout.setHeaderCurrentMenu(null)}
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
                        <div className="w-2/12 mt-1.5 group-hover:transform group-hover:-scale-x-110 group-hover:scale-y-110 bg-primary-100 rounded-xl text-primary p-2">
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
            onClick={() => mainLayout.setHeaderCurrentMenu(null)}
          >
            <UIBaseIcon icon="close" className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
