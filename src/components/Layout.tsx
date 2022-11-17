import type { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

interface LayoutProps extends PropsWithChildren {
  title: string;
}

export const Layout: FC<LayoutProps> = ({ children, title = 'Nextjs' }) => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    <Head>
      <title>{title}</title>
    </Head>
    <main className="flex w-screen flex-1 flex-col items-center justify-center">
      {children}
    </main>
  </div>
);
