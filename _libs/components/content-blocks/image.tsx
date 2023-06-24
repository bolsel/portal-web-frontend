import { FC } from 'react';
import { LibContentBlocksItemProps } from './_base';
import { UINextImageBlur } from '@portal-web/shared-ui';
import clsx from 'clsx';
import { urlAssetCdn } from '../../src/global-helpers';

const ImageTool: FC<
  LibContentBlocksItemProps<{
    caption: string;
    file: any;
    stretched: boolean;
    withBackground: boolean;
    withBorder: boolean;
  }>
> = ({ data }) => {
  const { caption, withBackground = false, withBorder = false } = data;
  return (
    <div
      className={clsx('w-full', {
        'py-2 rounded-lg px-[10%] mx-auto bg-base-200/40': withBackground,
        'border border-base-200': withBorder,
      })}
    >
      <UINextImageBlur
        alt=""
        width="0"
        height="0"
        sizes="100vw"
        className={clsx('rounded-lg m-0', {
          '!mb-7': !caption,
        })}
        src={urlAssetCdn(data.file)}
      />
      {caption ? (
        <div className="text-center italic text-sm">{caption}</div>
      ) : null}
    </div>
  );
};
export default ImageTool;
