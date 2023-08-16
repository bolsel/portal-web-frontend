'use client';

import { UIBaseIcon } from '@portalweb/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Menu() {
  const searchParams = useSearchParams();
  const pageType = searchParams.get('page') ?? 'index';
  const current =
    pageType !== 'index' ? `/aduan-publik?page=${pageType}` : '/aduan-publik';
  const menu = [
    {
      title: 'Daftar Aduan',
      link: '/aduan-publik',
    },
    {
      title: 'Kirim Aduan',
      link: '/aduan-publik?page=form',
    },
  ];
  return (
    <ul
      tabIndex={0}
      className="dropdown-content w-full menu bg-base-100  p-2 rounded-box shadow-md border-primary border-1 gap-1"
    >
      {menu.map((m, i) => {
        return (
          <li key={i}>
            <Link
              href={m.link}
              className={clsx({ active: m.link === current })}
            >
              <UIBaseIcon
                className="w-5 h-5"
                icon={'menu-default'}
                fallback="menu-default"
              />
              {m.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
