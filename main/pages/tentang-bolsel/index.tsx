import BaseJumbotron from '../../components/base/jumbotron';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import BaseBreadcrumb from '../../components/base/breadcrumb';
import { UIContainer } from '@portal-web/shared-ui';

const basePath = '/tentang-bolsel';
const menuItems = {
  'visi-misi': {
    label: 'Visi Misi Bolsel',
  },
  'lambang-dan-moto': {
    label: 'Lambang dan Moto',
  },
};
const menus = [
  {
    title: 'Tentang Bolsel',
    items: ['visi-misi', 'lambang-dan-moto'],
  },
];

export default function TentangBolselPage({ page }) {
  const router = useRouter();
  // const currentMenuItem = menuItems[page];

  return (
    <main>
      <section>
        <BaseJumbotron
          title="Tentang Bolsel"
          subtitle="Cari tahu tentang Bolsel"
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
            <div className=" w-full grid grid-cols-1 xl:grid-cols-[268px,auto] gap-6">
              {/*<div*/}
              {/*  v-on-clickaway="closeDropdown"*/}
              {/*  className="h-[42px] overflow-hidden xl:hidden"*/}
              {/*>*/}
              {/*</div>*/}
              <aside className="hidden xl:block p-4 border border-gray-200 rounded-xl h-[fit-content]">
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
                                    'font-bold text-primary-700': path === page,
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
                {/*  <p className="text-sm font-bold text-gray-800 mb-5">*/}
                {/*    {{menu.title}}*/}
                {/*  </p>*/}
                {/*  <li v-for="item in menu.items"*/}
                {/*  :key="item.id" className="mb-5 ml-7">*/}
                {/*  <Link href :to="item.link" className="text-sm text-gray-700 hover:text-green-700"*/}
                {/*  @click.native="gtagClickMenuAbout(item.label)">*/}
                {/*  {{item.label}}*/}
                {/*</NuxtLink>*/}
                {/*</li>*/}
                {/*</ul>*/}
              </aside>
              {/*{currentMenuItem?.component()}*/}
            </div>
          </div>
        </UIContainer>
      </section>
    </main>
  );
}
