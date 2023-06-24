import { FC } from 'react';
import { LibContentBlocksItemProps } from './_base';

const RawTool: FC<LibContentBlocksItemProps<{ html: string }>> = ({
  data: { html },
}) => {
  return (
    <div className="w-full -my-3" dangerouslySetInnerHTML={{ __html: html }} />
  );
};
export default RawTool;
