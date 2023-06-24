import { FC } from 'react';
import { LibContentBlocksItemProps } from './_base';

const CodeTool: FC<LibContentBlocksItemProps<{ code: string }>> = ({
  data: { code },
}) => {
  return (
    <div className="mockup-code my-5">
      <pre className="my-0">
        <code>{code}</code>
      </pre>
    </div>
  );
};
export default CodeTool;
