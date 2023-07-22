import '../styles/globals.css';
import type { Metadata } from 'next';
import {
  cal,
  lato,
  lora,
  inter,
  intro,
  heading,
  raleway,
} from '../styles/fonts';
import clsx from 'clsx';

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
      <body
        className={clsx(
          raleway.variable,
          heading.variable,
          cal.variable,
          lato.variable,
          lora.variable,
          inter.variable,
          intro.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
