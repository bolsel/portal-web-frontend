import { FC } from 'react';
import { LibContentBlocksItemProps, LibContentBlocksTunesProps } from './_base';
import { UIIcon } from '@portal-web/shared-ui';

const QuoteTool: FC<
  LibContentBlocksItemProps<
    {
      alignment: string;
      caption: string;
      text: string;
    },
    {
      tunes: LibContentBlocksTunesProps;
    }
  >
> = ({ data: { alignment, caption, text } }) => {
  return (
    <figure className="w-full mx-auto text-center">
      {/* <UIIcon icon={'mdi:format-quote-open'} className="w-12 h-12 mx-auto mb-3 text-gray-400"/> */}
      <blockquote>
        <p className="" dangerouslySetInnerHTML={{ __html: text }} />
      </blockquote>
      {caption ? (
        <figcaption className="italic">
          <cite className="">{caption}</cite>
        </figcaption>
      ) : null}
    </figure>
  );
};
export default QuoteTool;
