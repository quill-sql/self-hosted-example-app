'use client';

import { ReportBuilder } from '@quillsql/admin';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReportBuilderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <ReportBuilder
      reportId={searchParams.get('reportId') ?? undefined}
      destinationDashboardName={
        searchParams.get('destinationDashboardName') ?? undefined
      }
      virtualQuery={searchParams.get('virtualQuery') ?? undefined}
      onSaveComplete={() => router.replace('/')}
    />
  );
}
