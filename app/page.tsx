'use client';

import { DashboardManager } from '@quillsql/admin';
import { useRouter } from 'next/navigation';
import { managerStyle, reportBuilderHref } from './report-builder-href';

export default function HomePage() {
  const router = useRouter();

  return (
    <DashboardManager
      containerStyle={managerStyle}
      navigateToVirtualTableManager={(view?: string) => {
        router.push(view ? `/virtual-tables?view=${view}` : '/virtual-tables');
      }}
      navigateToReportBuilder={(report) => {
        router.push(reportBuilderHref(report));
      }}
    />
  );
}
