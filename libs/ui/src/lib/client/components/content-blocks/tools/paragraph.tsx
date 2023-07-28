import { FC } from 'react';
import {
  UIContentBlocksItemProps,
  UIContentBlocksTunesProps,
  tunesAlignmentClass,
} from '../_base';

const ParagraphTool: FC<
  UIContentBlocksItemProps<
    { text: string },
    {
      tunes: UIContentBlocksTunesProps;
    }
  >
> = ({ data, tunes }) => {
  const textAlign = tunesAlignmentClass(tunes);
  return (
    <p
      className={`text-${textAlign}`}
      dangerouslySetInnerHTML={{ __html: data.text }}
    />
  );
};
export default ParagraphTool;
