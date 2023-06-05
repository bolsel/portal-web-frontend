import { useRouter } from 'next/router';
import { getBuildedMenuProfilList } from '../../../src/menu';
import { UIIcon } from '@portal-web/shared-ui';
import Link from 'next/link';
import clsx from 'clsx';
import LibContentBlocks from '../../../../_libs/components/content-blocks/content-blocks';

export default function BaseLayoutDocumentMenu({ children, ...props }) {
  const { website, data } = props;
  const router = useRouter();
  const menu = getBuildedMenuProfilList({ website });
  return (
    <div className="">
      <div className="p-3 md:p-4 lg:py-8 lg:px-10 w-full xl:grid xl:grid-cols-[268px,1fr] xl:grid-rows-[1fr,auto] lg:gap-6">
        <div className="mb-5 lg:mb-0">
          <div className="dropdown w-full xl:block xl:dropdown-open">
            <label
              tabIndex={0}
              className="btn btn-sm btn-outline btn-primary drawer-button xl:hidden"
            >
              <UIIcon icon="mdi:menu" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content w-full menu bg-base-100  p-2 rounded-box shadow-md border-primary border-1"
            >
              {menu.map((m, i) => {
                return (
                  <li key={i}>
                    <Link
                      href={m.link}
                      className={clsx({ active: m.link === router.route })}
                    >
                      <UIIcon
                        className="w-5 h-5"
                        icon={m.icon ?? 'base:menu-default'}
                      />
                      {m.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
