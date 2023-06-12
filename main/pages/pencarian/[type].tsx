import BaseJumbotron from '../../components/base/jumbotron';
import {useRouter} from 'next/router';
import {Icon} from '@iconify/react';
import SearchList from '../../components/search/list';
import {useState} from 'react';
import clsx from 'clsx';
import BaseBreadcrumb from "../../components/base/breadcrumb";
import {UIContainer, UIPagination, UISearchInput} from "@portal-web/shared-ui";
import {useResourceSWR} from "@portal-web/shared-api";

export default function PencarianTypePage() {
  const router = useRouter();
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'list' | 'grid'>('list');

  const currentQuery = router.query.q as string;
  const type = router.query.type as string;
  const {data: dataNews, isLoading: isLoadingNews} = useResourceSWR('news', {
    pathQuery: ['latest'],
    paramsQuery: {
      search: currentQuery,
      page, limit: perPage
    }
  });
  return (
    <main>
      <section>
        <BaseJumbotron
          title="Pencarian"
          subtitle="Temukan informasi di Portal Bolsel"
          breadcrumb={
            <BaseBreadcrumb
              items={[
                {
                  label: 'Beranda',
                  link: '/',
                },
                {
                  label: 'Pencarian',
                  link: `/pencarian?q=${currentQuery}`,
                },
                {
                  label: type,
                  link: `/pencarian/${type}?q=${currentQuery}`,
                  active: true,
                },
              ]}
            />
          }
        />
      </section>
      <UIContainer className="relative -top-24 z-20">
        <div className="p-3 md:p-4 lg:py-8 lg:px-10 rounded-xl bg-white min-h-[600px] shadow">
          <div className="mb-6">
            <UISearchInput
              currentValue={currentQuery}
              onClear={() => router.push(`/pencarian/${type}?q=`)}
              onSubmit={(value) => router.push(`/pencarian/${type}?q=${value}`)}
            />
          </div>
          <section className="min-w-0 grid grid-cols-1 lg:grid-cols-2 items-start lg:items-center md:gap-6 mb-8">
            <div className="min-w-0 w-full flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <button
                type="button"
                className="btn btn-outline btn-sm btn-primary gap-2"
                onClick={() => router.push(`/pencarian?q=${currentQuery}`)}
              >
                <Icon icon="mdi:arrow-left" width={18} height={18}/>
                Kembali
              </button>
              <h2 className="font-roboto text-xl font-medium text-blue-gray-700">
                <span className="capitalize">{type}</span> terkait{' '}
                <br className="md:hidden"/>{' '}
                <strong className="text-primary-700">{currentQuery}</strong>
              </h2>
            </div>
            <div className="w-full">
              <div className="min-w-0 flex gap-4 justify-between lg:justify-end lg:divide-x lg:divide-gray-400">
                <div className="flex gap-4 items-center">
                  <p className="font-lato font-normal text-sm leading-6 text-blue-gray-500 whitespace-nowrap">
                    Tampilan :
                  </p>
                  <button
                    className="w-6 h-6 flex items-center justify-center"
                    title="Tampilan List"
                    onClick={() => setView('list')}
                  >
                    <Icon
                      icon="mdi:view-list"
                      className={clsx('w-full h-full', {
                        'filter grayscale opacity-30': view !== 'list',
                      })}
                    />
                  </button>
                  <button
                    className="w-6 h-6 flex items-center justify-center"
                    title="Tampilan Grid"
                    onClick={() => setView('grid')}
                  >
                    <Icon
                      icon="mdi:view-grid"
                      className={clsx('w-full h-full', {
                        'filter grayscale opacity-30': view !== 'grid',
                      })}
                    />
                  </button>
                </div>
              </div>
              {/*  <SearchToolbar*/}
              {/*  :list-view.sync="listView"*/}
              {/*  :total-count="pagination.totalRows"*/}
              {/*  :sort-value="sortOrder"*/}
              {/*  @change:sort="onChangeSort($event)"*/}
              {/*  >*/}
              {/*  <!-- Remove component's default search result text -->*/}
              {/*  <template #resultText>*/}
              {/*  <span className="hidden" />*/}
              {/*</template>*/}
              {/*</SearchToolbar>*/}
            </div>
          </section>
          <section>
            <SearchList
              items={dataNews && dataNews.data ? dataNews.data : []}
              isLoading={isLoadingNews}
              maxLength={10}
              view={view}
            />
            {dataNews && dataNews.meta && (
              <UIPagination
                total={dataNews.meta.filter_count}
                page={page}
                limit={perPage}
                setLimit={setPerPage}
                setPage={setPage}
              />
            )}

            {/*:list-view="device.isMobile ? 'grid' : listView"*/}
            {/*:loading="$fetchState.pending"*/}
            {/*:items="searchData"*/}
            {/*:max-length="pagination.itemsPerPage"*/}
            {/*className="mb-6"*/}
            {/*/>*/}
            {/*<Pagination*/}
            {/*  className="mt-auto"*/}
            {/*  v-bind="pagination"*/}
            {/*@previous-page="onPaginationChange('prev-page', $event)"*/}
            {/*@next-page="onPaginationChange('next-page', $event)"*/}
            {/*@page-change="onPaginationChange('page-change', $event)"*/}
            {/*@per-page-change="onPaginationChange('per-page-change', $event)"*/}
            {/*/>*/}
          </section>
        </div>
      </UIContainer>
      {/*<SearchByDomain :domain="domain" :keyword="searchKeyword" />*/}
    </main>
  );
}
