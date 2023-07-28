import { FC } from 'react';
import { UIContentBlocksItemProps } from '../_base';

// eslint-disable-next-line @typescript-eslint/ban-types
const DelimiterTool: FC<UIContentBlocksItemProps<{}>> = () => {
  return (
    <div className="w-full my-5 text-center text-3xl leading-4	tracking-widest font-bold text-gray-600">
      ***
    </div>
  );
};
export default DelimiterTool;
