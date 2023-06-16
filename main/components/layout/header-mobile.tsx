import { useLayoutDefaultContext } from './context';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { UIContainer } from '@portal-web/shared-ui';

export default function LayoutDefaultHeaderMobile() {
  const layoutData = useLayoutDefaultContext();
  const [active, setActive] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    layoutData.setMobileMenuShow?.(false);
  }, [router]);
  return (
    <Transition
      as={Fragment}
      show={layoutData.mobileMenuShow}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="overflow-y-scroll overscroll-none top-12 sm:top-16 left-0 right-0 bottom-0 fixed bg-primary z-50 border-t border-primary-500 lg:hidden ">
        <UIContainer className="h-full mb-1">
          <div className="py-4 w-full h-full flex flex-col">
            <section className="min-w-0 flex flex-col">
              {layoutData.menuList.map((m, i) => (
                <div
                  key={i}
                  className="navigation__sidebar__menu py-4 text-white transition-all ease-in duration-150"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      setActive(null);
                      if (active !== i) {
                        setActive(i);
                      }
                    }}
                  >
                    <h3>{m.title}</h3>
                    <div className="navigation__sidebar__button h-6 w-6 flex items-center justify-center rounded-full hover:bg-primary-600">
                      <Icon
                        icon={
                          active === i ? 'base:chevron-up' : 'base:chevron-down'
                        }
                        fill="white"
                        className="w-8 h-8 cursor-pointer transition-transform ease-in"
                      />
                    </div>
                  </div>
                  <Transition
                    show={active === i}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ul className="flex flex-col mt-3 gap-6 pl-6 py-3 border-l-2 border-primary-500">
                      {m.items &&
                        m.items.map((sm, smI) => {
                          return (
                            <li key={smI}>
                              <Link
                                href={sm.link}
                                className="text-sm font-normal leading-6 block"
                                target={
                                  sm.link.startsWith('http') ||
                                  sm.link.startsWith('https')
                                    ? '_blank'
                                    : '_self'
                                }
                              >
                                {sm.title}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </Transition>
                </div>
              ))}
            </section>
            <section className="mt-auto pt-4 border-t border-primary-500">
              <p className="font-lato text-sm font-normal leading-6 text-white text-center">
                Copyright © 2023 <br /> Pemerintah Kabupaten Bolaang Mongondow
                Selatan
              </p>
            </section>
          </div>
        </UIContainer>
      </div>
    </Transition>
  );
}
