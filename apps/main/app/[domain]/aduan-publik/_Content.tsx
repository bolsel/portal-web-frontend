'use client';
import { useSearchParams } from 'next/navigation';
import Form from './_Form';
import { UIBaseIcon, UISwrResource } from '@portalweb/ui';
import { dateToLocaleDateString } from '@portalweb/base';

export default function Content({ site }) {
  const searchParams = useSearchParams();
  const pageType = searchParams.get('page') ?? 'index';
  return (
    <>
      {pageType === 'form' ? <Form site={site} /> : null}
      {pageType === 'success' ? (
        <div className="bg-primary-200 rounded-lg flex items-start justify-start lg:items-center p-5 gap-4">
          <UIBaseIcon icon="check" className="w-8 h-8" />
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
            pathQuery={['byWebId', site.id]}
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
                  {data.data.map((item, index) => {
                    return (
                      <div key={index} className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <UIBaseIcon icon="user" className="w-full h-full" />
                          </div>
                        </div>
                        <div className="chat-header">
                          <strong>*****</strong>{' '}
                          <time className="text-xs opacity-50">
                            {dateToLocaleDateString(item.date_created, {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
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
    </>
  );
}
