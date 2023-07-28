export type UIContentBlocksBaseProps = {
  time: number;
  blocks: Record<string, any>;
  version: string;
};
export type UIContentBlocksItemProps<
  Data extends Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Ext extends Record<string, any> = {}
> = {
  id: string;
  type: string;
  data: Data;
} & Ext;

export type UIContentBlocksTunesProps = {
  alignment: { alignment: string };
};

export function tunesAlignmentClass(tunes: UIContentBlocksTunesProps) {
  return tunes?.alignment && tunes?.alignment?.alignment
    ? tunes.alignment.alignment
    : 'justify';
}
