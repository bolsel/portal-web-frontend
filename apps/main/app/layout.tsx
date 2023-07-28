import '@portalweb/ui/presets/base/main.css';
import '../styles/globals.css';
import type { Metadata } from 'next';
import { variableClass } from '../styles/fonts';
import clsx from 'clsx';
import { UIModalProvider } from '@portalweb/ui';

export const metadata: Metadata = {
  title: 'Portal Resmi Pemkab Bolsel',
  description: 'Portal Resmi Pemerintah Kabupaten Bolaang Mongondow Selatan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={clsx(variableClass)}>
        <UIModalProvider>{children}</UIModalProvider>
      </body>
    </html>
  );
}
