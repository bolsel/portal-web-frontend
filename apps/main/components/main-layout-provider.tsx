'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

export type MainLayoutContextType = {
  menuList: Record<string, any>[];
  settings: Record<string, any>;
  headerCurrentMenu: any;
  setHeaderCurrentMenu: any;
};
export const MainLayoutContext = createContext<MainLayoutContextType>({
  menuList: [],
  settings: {},
  headerCurrentMenu: null,
  setHeaderCurrentMenu: null,
});

export function useMainLayoutContext() {
  return useContext(MainLayoutContext);
}

export function MainLayoutProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: Pick<MainLayoutContextType, 'menuList' | 'settings'>;
}) {
  const [headerCurrentMenu, setHeaderCurrentMenu] = useState(null);

  return (
    <MainLayoutContext.Provider
      value={{
        ...value,
        headerCurrentMenu,
        setHeaderCurrentMenu,
      }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
}
