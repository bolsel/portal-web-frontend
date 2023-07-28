import { FC } from 'react';
import { UIContentBlocksItemProps } from '../_base';

const RawTool: FC<UIContentBlocksItemProps<{ html: string }>> = ({
  data: { html },
}) => {
  return (
    <div className="w-full -my-3" dangerouslySetInnerHTML={{ __html: html }} />
  );
};
export default RawTool;
