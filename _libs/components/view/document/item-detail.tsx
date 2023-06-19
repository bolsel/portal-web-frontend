import { UIIcon } from '@portal-web/shared-ui';
import LibBaseShareItem from '../../base/share-item';
import { LibViewDocumentListItemProps } from './list-item';
import { mimeTypeLabel } from '../../../src/global-helpers';
import Link from 'next/link';

export type LibViewDocumentItemDetailProps = {
  data: LibViewDocumentListItemProps['data'];
  downloadLink?: boolean;
};
export default function LibViewDocumentItemDetail({
  data,
  downloadLink = false,
}: LibViewDocumentItemDetailProps) {
  return (
    <div className="flex flex-col p-4 md:p-6 gap-2 max-w-[550px] overflow-y-auto overflow-x-hidden">
      <section className="flex gap-4">
        <div className="w-6">
          <UIIcon
            icon="mdi:information-outline"
            className="self-start text-primary w-6 h-6"
          />
        </div>
        <div>
          <h2 className="font-lato text-xs text-blue-gray-400 mb-1 leading-5">
            Deskripsi Dokumen
          </h2>

          <div className="w-full max-h-[116px] overflow-y-auto pr-4">
            <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
              {data.description ?? '-'}
            </p>
          </div>
        </div>
      </section>
      <section className="flex gap-4">
        <div className="w-6">
          <UIIcon
            icon="base:file-outline"
            className="self-start text-primary w-6 h-6"
          />
        </div>
        <div>
          <h2 className="font-lato text-xs text-blue-gray-400 mb-1 leading-5">
            Format Dokumen
          </h2>
          <p
            className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-4
hover:text-primary-700 hover:bg-primary-100"
          >
            {mimeTypeLabel(data.file.type)}
          </p>
        </div>
      </section>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="flex gap-4">
          <div className="w-6">
            <UIIcon
              icon="base:calendar"
              className="self-start text-primary w-6 h-6"
            />
          </div>
          <div>
            <h2 className="font-lato text-xs text-blue-gray-400 mb-1 leading-5">
              Tanggal Publish
            </h2>
            <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
              {data.publish_date_format}
            </p>
          </div>
        </section>
        <section className="flex gap-4">
          <div className="w-6">
            <UIIcon
              icon="base:calendar"
              className="self-start text-primary w-6 h-6"
            />
          </div>
          <div>
            <h2 className="font-lato text-xs text-blue-gray-400 mb-1 leading-5">
              Diupdate pada
            </h2>
            <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
              {data.date_updated_format ?? '-'}
            </p>
          </div>
        </section>
      </div>

      <section className="flex gap-4">
        <div className="w-6">
          <UIIcon
            icon="mdi:share-variant-outline"
            className="self-start text-primary w-6 h-6"
          />
        </div>
        <div className="overflow-auto">
          <h2 className="font-lato text-xs text-blue-gray-400 mb-1 leading-5">
            Bagikan Dokumen
          </h2>
          <LibBaseShareItem
            url={`/dokumen/${data.slug}`}
            title={data.title}
            quote={data.description}
          />
        </div>
      </section>

      {downloadLink && (
        <div className="mt-5 flex items-center justify-center">
          <Link
            className="btn btn-primary btn-outline btn-sm text-white gap-2"
            href={data.file.url}
            target="_blank"
            download
          >
            <UIIcon icon="mdi:download-outline" className="w-5 h-5" /> Unduh
            Dokumen
          </Link>
        </div>
      )}
    </div>
  );
}
