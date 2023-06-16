import { serverSideHost } from '../../src/server';
import {
  OrganizationPejabatResource,
  OrganizationsResource,
} from '@portal-web/shared-api/server';
import LibContentBlocks from '../../../_libs/components/content-blocks/content-blocks';
import BaseLayoutProfilMenu from '../../components/base/layout/profil-menu-layout';
import Image from 'next/image';

export async function getServerSideProps(context) {
  const website = await serverSideHost(context);
  if (!website) {
    return {
      redirect: {
        permanent: false,
        destination: '/404-website',
      },
      props: {},
    };
  }
  const { data } = await new OrganizationPejabatResource().apiResourceFetch({
    pathQuery: ['byOrganizationId', website.organization.id],
  });
  return {
    props: {
      website,
      title: 'Profil Pejabat',
      subTitle: `Profil pejabat ${website.organization.name}`,
      data: data ?? [],
    },
  };
}

export default function PageProfilSekilas(props) {
  const { data, website } = props;

  return (
    <BaseLayoutProfilMenu {...props}>
      <div className="max-w-none">
        <ul className="flex flex-col divide-y gap-4">
          {data.length ? (
            data.map((item, index) => {
              return (
                <li key={index} className="group">
                  <div className="flex items-start p-3 gap-4 ">
                    <div className="avatar">
                      <div className="w-24 h-24 mask mask-squircle">
                        <Image
                          src={item.image.url}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col font-roboto">
                      <div className="italic uppercase">{item.jabatan}</div>
                      <div className="text-lg font-bold">{item.name}</div>
                      <div>NIP: {item.nip}</div>
                    </div>
                  </div>
                  {item.profil && item.profil.blocks && (
                    <div className=" prose max-w-none">
                      <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title w-full p-0 m-0">
                          <button className="btn btn-sm btn-primary text-white normal-case">
                            Selengkapnya
                          </button>
                        </div>
                        <div className="collapse-content w-full bg-base-200 peer-checked:p-2 rounded-box">
                          <LibContentBlocks data={item.profil} />
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })
          ) : (
            <div>Belum ada data</div>
          )}
        </ul>
      </div>
    </BaseLayoutProfilMenu>
  );
}
