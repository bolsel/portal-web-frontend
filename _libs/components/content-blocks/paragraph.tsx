import { FC } from 'react';
import {
  LibContentBlocksItemProps,
  LibContentBlocksTunesProps,
  tunesAlignmentClass,
} from './_base';

const ParagraphTool: FC<
  LibContentBlocksItemProps<
    { text: string },
    {
      tunes: LibContentBlocksTunesProps;
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
