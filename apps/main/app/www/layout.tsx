import { ReactNode } from 'react';
import './layout.css';
import HeaderMain from '../../components/header/main-header';
import { getMenuList } from '../../lib/menu-list';
import { MainLayoutProvider } from '../../components/main-layout-provider';
import MainFooter from '../../components/footer/main-footer';
import { apiClient } from '@portalweb/api/server';
import { readSingleton } from '@directus/sdk';

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const menuList = await getMenuList();
  const settings = await apiClient().request(
    readSingleton('portal_web_settings')
  );

  return (
    <MainLayoutProvider value={{ menuList, settings }}>
      <HeaderMain />
      {children}
      <MainFooter />
    </MainLayoutProvider>
  );
}
