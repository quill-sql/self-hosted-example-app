import { Suspense } from 'react';
import ReportBuilderClient from './report-builder-client';

export default function ReportBuilderPage() {
  return (
    <Suspense fallback={null}>
      <ReportBuilderClient />
    </Suspense>
  );
}
