import {
  IUIBaseCreateCustomizableDefine,
  UIBaseCreateCustomizable,
} from '../../create/customize';
import { UIBaseIcon } from '../../icon';

export type UIBasePaginationType = IUIBaseCreateCustomizableDefine<{
  page: number;
}>;

export const UIBasePagination: UIBasePaginationType['returnType'] = (props) => {
  return UIBaseCreateCustomizable({
    props,
    defaults: {},
    Component() {
      return (
        <nav aria-label="Navigation">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Previous</span>
                <UIBaseIcon icon="chevron-left" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Next</span>
                <UIBaseIcon icon="chevron-right" />
              </a>
            </li>
          </ul>
        </nav>
      );
    },
  });
};
