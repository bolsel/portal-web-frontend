import { useEffect, useRef, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { UISwrResource } from '@portal-web/shared-ui';

export interface AplikasiKategoriListSelectSwrProps {
  categories: any;
  staticOptions?: boolean;
  selected: string[];
  setSelected: any;
}

export default function AplikasiKategoriListSelectSwr({
  categories,
  staticOptions = true,
  selected,
  setSelected,
}: AplikasiKategoriListSelectSwrProps) {
  const [allSelect, setAllSelect] = useState(true);
  useEffect(() => {
    if (allSelect) {
      setSelected(categories.map((c) => c.id));
    } else {
      setSelected([]);
    }
  }, [allSelect]);

  useEffect(() => {
    if (refSelectAllCheckbox.current) {
      if (selected.length > 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        refSelectAllCheckbox.current.indeterminate =
          selected.length !== categories.length;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        refSelectAllCheckbox.current.indeterminate = false;
      }
    }
    if (selected.length === 0) {
      setAllSelect(false);
    }
  }, [selected]);
  const refSelectAllCheckbox = useRef(null);
  const Comp = () => {
    return (
      <Listbox value={selected} onChange={setSelected} multiple horizontal>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm mb-3">
            <span className="block truncate">
              Filter Kategori ({selected.length})
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Icon
                icon="base:unfold-more-horizontal"
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options static={staticOptions}>
            {categories.map(({ id: catId, name: catName }) => {
              const hasSelect = selected.indexOf(catId) >= 0;
              return (
                <Listbox.Option
                  key={catId}
                  value={catId}
                  className="relative flex gap-2 cursor-pointer select-none py-1 pl-7 pr-4 hover:bg-primary-50 rounded-lg"
                >
                  <input
                    readOnly
                    type="checkbox"
                    checked={hasSelect}
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  {catName}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
    );
  };
  return <Comp />;
  // return (
  //   <UISwrResource
  //     resourceKey={'application_categories'}
  //     loadingComponent={() => <div>memuat data...</div>}
  //     noItemsComponent={() => <div>Gagal memuat data</div>}
  //   >
  //     {({data}) => {
  //       return <Comp data={data}/>
  //     }}
  //   </UISwrResource>
  // )
}
