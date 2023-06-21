import { serverSideHost, websiteHasModule } from '../../src/server';
import { OrganizationsResource } from '@portal-web/shared-api/server';
import ModulesAduanPublikForm from '../../components/modules/aduan-publik/form';
import { UIIcon, UISwrResource } from '@portal-web/shared-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export async function getServerSideProps(context) {
  const website = await serverSideHost(context);
  if (!websiteHasModule(website, 'aduan_publik')) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }
  if (!website) {
    return {
      redirect: {
        permanent: false,
        destination: '/404-website',
      },
      props: {},
    };
  }
  const pageType = context.query.page ?? 'index';
  const data = await new OrganizationsResource().apiResourceFetch({
    pathQuery: ['getSekilasById', website.organization.id],
  });
  return {
    props: {
      website,
      title: 'Aduan Publik',
      subTitle: `Kirimkan aduan anda ke ${website.organization.name}`,
      data,
      pageType,
    },
  };
}

export default function AduanPublikPage(props) {
  const { data, pageType, website } = props;
  const router = useRouter();
  console.log(router);

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
                      className={clsx({ active: m.link === router.asPath })}
                    >
                      <UIIcon className="w-5 h-5" icon={'base:menu-default'} />
                      {m.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {pageType === 'form' ? (
          <ModulesAduanPublikForm website={website} />
        ) : null}
        {pageType === 'success' ? (
          <div className="bg-primary-200 rounded-lg flex items-start justify-start lg:items-center p-5 gap-4">
            <UIIcon icon="mdi:check" className="w-8 h-8" />
            <span>
              Terima Kasih. Aduan anda telah kami terima, silahkan menunggu
              balasan di Email atau Nomor HP yang telah anda dimasukkan.
            </span>
          </div>
        ) : null}
        {pageType === 'index' ? (
          <div>
            <UISwrResource
              resourceKey="web_aduan_publik"
              pathQuery={['byWebId', website.id]}
              paramsQuery={{ limit: 10 }}
              loadingComponent={() => (
                <div className="animate-pulse bg-base-200 p-5 rounded-lg">
                  Memuat data aduan...
                </div>
              )}
              noItemsComponent={() => <div>Belum ada data aduan</div>}
            >
              {({ data }) => {
                return (
                  <div className="flex flex-col gap-4">
                    {data.map((item, index) => {
                      return (
                        <div key={index} className="chat chat-start">
                          <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                              <UIIcon
                                icon="mdi:person"
                                className="w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="chat-header">
                            <strong>*****</strong>{' '}
                            <time className="text-xs opacity-50">
                              {item.date_created_format}
                            </time>
                          </div>
                          <div className="chat-bubble bg-base-200 text-neutral w-full">
                            {item.isi}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </UISwrResource>
          </div>
        ) : null}
      </div>
    </div>
  );
}
