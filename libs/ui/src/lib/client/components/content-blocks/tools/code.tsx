import { FC } from 'react';
import { UIContentBlocksItemProps } from '../_base';

const CodeTool: FC<UIContentBlocksItemProps<{ code: string }>> = ({
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
