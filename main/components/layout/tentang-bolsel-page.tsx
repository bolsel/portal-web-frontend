import BaseJumbotron from '../base/jumbotron';
import Link from 'next/link';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import BaseBreadcrumb from '../base/breadcrumb';
import { UIContainer } from '@portal-web/shared-ui';

export default function LayoutTentangBolselPage({ children, page }) {
  const basePath = '/tentang-bolsel';
  const menuItems = {
    'visi-misi': {
      label: 'Visi Misi',
    },
    'logo-daerah': {
      label: 'Logo Daerah',
    },
  };
  const menus = [
    {
      title: 'Tentang Bolsel',
      items: ['visi-misi', 'logo-daerah'],
    },
  ];
  return (
    <main>
      <section>
        <BaseJumbotron
          title="Tentang Bolsel"
          subtitle="Ketahui segalanya tentang Bolaang Mongondow Selatan"
          metaData
          breadcrumb={
            <BaseBreadcrumb
              items={[
                {
                  label: 'Beranda',
                  link: '/',
                },
                {
                  label: 'Tentang Bolsel',
                  link: '/tentang-bolsel',
                  active: true,
                },
              ]}
            />
          }
        />
      </section>
      <section className="w-full bg-gray-200">
        <UIContainer className="relative -top-24 z-20">
          <div className="p-3 md:p-6 lg:py-8 lg:px-10 rounded-xl bg-white">
            <div className="drawer drawer-mobile h-full">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content lg:px-10">
                <div className="mb-5 lg:mb-0">
                  <label
                    htmlFor="my-drawer-2"
                    className="btn btn-sm btn-outline btn-primary drawer-button lg:hidden"
                  >
                    <Icon icon="mdi:menu" />
                  </label>
                </div>
                {children}
              </div>
              <div className="drawer-side xl:w-[268px]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <aside className="p-4 lg:border lg:border-gray-200 lg:rounded-xl h-full lg:h-[fit-content] bg-white w-80 lg:w-auto">
                  {/*<ul>*/}
                  {menus.map((menu, i) => {
                    return (
                      <div key={i}>
                        <p className="text-sm font-bold text-gray-800 mb-5">
                          {menu.title}
                        </p>
                        <ul>
                          {menu.items.map((path, subI) => {
                            const subMenu = menuItems[path];
                            return (
                              <li key={subI} className="mb-5 ml-7">
                                <Link
                                  href={`${basePath}/${path}`}
                                  className={clsx(
                                    'text-sm text-gray-700 hover:text-primary-700',
                                    {
                                      'font-bold text-primary-700':
                                        path === page,
                                    }
                                  )}
                                >
                                  {subMenu.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </aside>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xl:grid-cols-[268px,auto] gap-6"></div>
            {/*<div*/}
            {/*  v-on-clickaway="closeDropdown"*/}
            {/*  className="h-[42px] overflow-hidden xl:hidden"*/}
            {/*>*/}
            {/*</div>*/}
          </div>
        </UIContainer>
      </section>
    </main>
  );
}
