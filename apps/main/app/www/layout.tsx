import { ReactNode } from 'react';
import './layout.css';
import HeaderMain from '../../components/header/main-header';
import { getMenuList } from '../../lib/menu-list';
import { MainLayoutProvider } from '../../components/main-layout-provider';
import MainFooter from '../../components/footer/main-footer';
import { apiResourcePortalWebSettings } from '@portalweb/api/server';

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const menuList = await getMenuList();
  // const settings =
  //   (await apiResourcePortalWebSettings().singleton.read()) ?? {};
  const settings = await apiResourcePortalWebSettings().fetch({
    pathQuery: ['all'],
  });

  return (
    <MainLayoutProvider value={{ menuList, settings }}>
      <HeaderMain />
      {children}
      <MainFooter />
    </MainLayoutProvider>
  );
}
