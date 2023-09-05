/* eslint-disable @typescript-eslint/ban-ts-comment */

import { resourceItems } from '../server';

export type TApiResourceItemsList = typeof resourceItems;
export type TApiResourceItemsListKeys = keyof TApiResourceItemsList;

export type TApiResourcePathReturn<
  R extends TApiResourceItemsListKeys,
  Res extends TApiResourceItemsList[R] = TApiResourceItemsList[R]
> = {
  [T in keyof Res['paths']]: {
    [P in keyof Res['paths'][T]]: Awaited<
      // @ts-ignore
      ReturnType<Res['paths'][T][P]>
    >;
  };
};
