'use client';

import { ReportBuilder } from '@quillsql/admin';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReportBuilderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportId = searchParams.get('reportId') || undefined;
  const destinationDashboardName =
    searchParams.get('destinationDashboardName') || undefined;
  const virtualQuery = searchParams.get('virtualQuery') || undefined;

  return (
    <ReportBuilder
      reportId={reportId}
      destinationDashboardName={destinationDashboardName}
      virtualQuery={virtualQuery}
      onSaveComplete={() => router.push('/')}
    />
  );
}
