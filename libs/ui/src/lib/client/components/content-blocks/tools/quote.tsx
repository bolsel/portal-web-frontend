import { FC } from 'react';
import { UIContentBlocksItemProps, UIContentBlocksTunesProps } from '../_base';

const QuoteTool: FC<
  UIContentBlocksItemProps<
    {
      alignment: string;
      caption: string;
      text: string;
    },
    {
      tunes: UIContentBlocksTunesProps;
    }
  >
> = ({ data: { alignment, caption, text } }) => {
  return (
    <figure className="w-full mx-auto text-center">
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
