'use client';

import { AdminProvider } from '@quillsql/admin';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { reportBuilderHref } from './report-builder-href';

export default function Providers({
  children,
  publicKey,
}: {
  children: ReactNode;
  publicKey: string;
}) {
  const router = useRouter();

  return (
    <AdminProvider
      publicKey={publicKey}
      queryEndpoint="/api/quill"
      hideEnvDropdown
      navigateToReportBuilder={(report) => {
        router.push(reportBuilderHref(report));
      }}
    >
      {children}
    </AdminProvider>
  );
}
