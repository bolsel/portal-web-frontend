export type UIBaseListViewType = 'list' | 'grid';

export type OneOfObject<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];
