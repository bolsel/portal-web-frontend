export type LibContentBlocksBaseProps = {
  time: number;
  blocks: LibContentBlocksItemProps<any>[];
  version: string;
};
export type LibContentBlocksItemProps<
  Data extends Record<string, any>,
  Ext extends Record<string, any> = {}
> = {
  id: string;
  type: string;
  data: Data;
} & Ext;

export type LibContentBlocksTunesProps = {
  alignment: { alignment: string };
};

export function tunesAlignmentClass(tunes: LibContentBlocksTunesProps) {
  return tunes?.alignment && tunes?.alignment?.alignment
    ? tunes.alignment.alignment
    : 'justify';
}
