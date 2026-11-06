'use client';

import { Suspense } from 'react';
import { ReportBuilder } from '@quillsql/admin';
import { useRouter, useSearchParams } from 'next/navigation';

function ReportBuilderPageContent() {
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

export default function ReportBuilderPage() {
  return (
    <Suspense fallback={null}>
      <ReportBuilderPageContent />
    </Suspense>
  );
}
