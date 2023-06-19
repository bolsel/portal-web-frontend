import { UIIcon } from '@portal-web/shared-ui';
import LibBaseModalDialog from '../../base/modal-dialog';
import Link from 'next/link';
import LibBaseShareItem from '../../base/share-item';
import LibViewDocumentItemDetail from './item-detail';

export default function LibViewDocumentItemDialog({ data, show, setShow }) {
  return (
    <LibBaseModalDialog
      show={show}
      setShow={setShow}
      header={
        data ? (
          <section className="p-6 pb-0 max-w-[510px]">
            <span
              className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-4
hover:text-primary-700 hover:bg-primary-100"
            >
              {data.category?.name}
            </span>
            <h1 className="font-roboto font-medium text-[21px] leading-[34px] text-primary-700">
              {data.title}
            </h1>
          </section>
        ) : (
          ''
        )
      }
      footer={
        <div className="bg-gray-50 flex gap-4 w-full items-end justify-end py-4 z-[100] mt-auto md:mt-0 px-6">
          <button
            className="btn btn-primary btn-outline btn-sm !justify-center"
            onClick={() => setShow(false)}
          >
            Tutup
          </button>

          {data && (
            <Link
              className="btn btn-primary btn-sm text-white gap-2"
              href={data.file.url}
              target="_blank"
              download
            >
              <UIIcon icon="base:download" fontSize="18px" /> Unduh
            </Link>
          )}

          {data && (
            <Link
              className="btn btn-primary btn-sm text-white gap-2"
              href={`/dokumen/${data.slug}`}
            >
              <UIIcon icon="mdi:eye-outline" fontSize="18px" /> Lihat
            </Link>
          )}
        </div>
      }
    >
      {data && <LibViewDocumentItemDetail data={data} />}
    </LibBaseModalDialog>
  );
}
