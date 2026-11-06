'use client';

import { DashboardManager } from '@quillsql/admin';
import { useRouter } from 'next/navigation';
import { reportBuilderPath } from './shell';

const fill = { width: '100%', height: '100%' };

export default function HomePage() {
  const router = useRouter();

  return (
    <DashboardManager
      containerStyle={fill}
      navigateToVirtualTableManager={(view?: string) => {
        router.push(view ? `/virtual-tables?view=${view}` : '/virtual-tables');
      }}
      navigateToReportBuilder={(report) => router.push(reportBuilderPath(report))}
    />
  );
}
