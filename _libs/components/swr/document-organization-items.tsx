import { UIPagination, UISwrResource } from '@portal-web/shared-ui';
import React, { useEffect, useState } from 'react';
import LibViewDocumentList from '../../../_libs/components/view/document/list';
import LibViewDocumentListItemSkeleton from '../view/document/list-item-skeleton';
import LibViewDocumentItemDialog from '../view/document/item-dialog';

export type LibSwrDocumentOrganizationItemsProps = {
  organizationId: string;
  category?: string;
  search?: string;
};

function EmptyItems({ category }) {
  return (
    <section className="w-full flex flex-col items-center justify-center bg-white pb-8">
      <section className="text-center">
        <p className="font-lato text-sm leading-relaxed text-gray-700 text-center mb-0.5">
          Untuk sementara belum ada dokumen (<strong>{category}</strong>)
        </p>
      </section>
    </section>
  );
}

function _Skeleton({ max }) {
  const items: any = [];
  for (let i = 0; i < max; i++) {
    items.push(<LibViewDocumentListItemSkeleton key={i} />);
  }
  return <div className="flex flex-col gap-4">{items}</div>;
}

export default function LibSwrDocumentOrganizationItems({
  organizationId,
  category,
  search,
}: LibSwrDocumentOrganizationItemsProps) {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selengkapnyaShow, setSelengkapnyaShow] = useState(false);
  const [current, setCurrent] = useState<any>();
  useEffect(() => {
    setPage(1);
  }, [category, search]);
  const filter = {};
  if (category) {
    filter['category'] = { _eq: category };
  }
  return (
    <UISwrResource
      resourceKey={'organization_documents'}
      loadingComponent={() => <_Skeleton max={5} />}
      noItemsComponent={() => <EmptyItems category={category} />}
      pathQuery={['byOrganizationId', organizationId]}
      paramsQuery={{
        limit: perPage,
        page: page,
        search: search,
        filter,
      }}
    >
      {({ data, meta }) => {
        return (
          <div className="w-full">
            <LibViewDocumentList
              items={data}
              viewType="list"
              hideViewSwitch
              itemAction={(data) => {
                setCurrent(data);
                setSelengkapnyaShow(true);
              }}
            />
            <div className="mt-6">
              <UIPagination
                total={meta.filter_count}
                page={page}
                limit={perPage}
                setLimit={setPerPage}
                setPage={setPage}
              />
            </div>
            <div className="flex items-end justify-end">
              <LibViewDocumentItemDialog
                data={current}
                show={selengkapnyaShow}
                setShow={setSelengkapnyaShow}
              />
            </div>
          </div>
        );
      }}
    </UISwrResource>
  );
}
