'use client';

import { Suspense } from 'react';
import { VirtualTableManager } from '@quillsql/admin';
import { useSearchParams } from 'next/navigation';

const fill = { width: '100%', height: '100%' };

function VirtualTables() {
  const view = useSearchParams().get('view') ?? undefined;
  return <VirtualTableManager virtualTable={view} containerStyle={fill} />;
}

export default function VirtualTablesPage() {
  return (
    <Suspense fallback={null}>
      <VirtualTables />
    </Suspense>
  );
}
