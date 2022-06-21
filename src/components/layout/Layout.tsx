import * as React from 'react';

import Footer from '@/components/layout/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
