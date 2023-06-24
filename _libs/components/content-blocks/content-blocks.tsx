import { LibContentBlocksBaseProps } from './_base';
import ParagraphTool from './paragraph';
import ImageTool from './image';
import EmbedTool from './embed';
import HeadingTool from './heading';
import ListTool from './list';
import CodeTool from './code';
import AttachesTool from './attaches';
import TableTool from './table';
import QuoteTool from './quote';
import DelimiterTool from './delimiter';
import RawTool from './raw';
import ChecklistTool from './checklist';

const tools = {
  paragraph: ParagraphTool,
  image: ImageTool,
  embed: EmbedTool,
  header: HeadingTool,
  list: ListTool,
  nestedlist: ListTool,
  code: CodeTool,
  attaches: AttachesTool,
  table: TableTool,
  quote: QuoteTool,
  delimiter: DelimiterTool,
  raw: RawTool,
  checklist: ChecklistTool,
};

export default function LibContentBlocks({
  time,
  blocks,
  version,
}: LibContentBlocksBaseProps) {
  const items: any = [];
  blocks = blocks ?? [];
  if (!blocks.length) {
    return <div>Belum ada data.</div>;
  }
  blocks.forEach((block, i) => {
    if (tools[block.type]) {
      const Comp = tools[block.type];
      items.push(<Comp key={i} {...block} />);
    }
  });
  return <div className="contents-blocks">{items}</div>;
}
