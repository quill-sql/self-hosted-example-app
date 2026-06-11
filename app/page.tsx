'use client';

import { DashboardManager } from '@quillsql/admin';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
      <DashboardManager
        navigateToVirtualTableManager={(view?: string) => {
          router.push(`/virtual-tables?view=${view ?? ''}`);
        }}
        containerStyle={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
      />
  );
}
