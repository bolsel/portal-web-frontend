import {
  IUIBaseCreateCustomizableDefine,
  UIBaseCreateCustomizable,
} from '../../../base';
import SelectPage from './select-page';

export type UIPaginationType = IUIBaseCreateCustomizableDefine<{
  total: number;
  page: number;
  limit: number;
  setLimit: any;
  setPage: any;
  customPerPages?: number[];
}>;

export const UIPagination: UIPaginationType['returnType'] = (props) => {
  return UIBaseCreateCustomizable<UIPaginationType>({
    props,
    defaults: {},
    Component({ total, page, limit, setLimit, setPage }) {
      const total_pages = Math.ceil(total / limit);
      return (
        <div className="font-lora w-full border-t-2 border-t-primary-base p-2 ">
          <div className="flex flex-col items-center">
            <div className="text-sm mb-2">
              Total data{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {total}
              </span>{' '}
            </div>
            <div className="join">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn font-medium btn-outline btn-sm join-item"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
              </button>
              <SelectPage
                totalPage={total_pages}
                page={page}
                setPage={setPage}
              />
              <button
                disabled={page === total_pages}
                onClick={() => setPage(page + 1)}
                className="btn font-medium btn-outline btn-sm join-item"
              >
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      );
    },
  });
};
