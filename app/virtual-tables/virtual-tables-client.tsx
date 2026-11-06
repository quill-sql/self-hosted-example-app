'use client';

import { VirtualTableManager } from '@quillsql/admin';
import { useSearchParams } from 'next/navigation';
import { managerStyle } from '../report-builder-href';

export default function VirtualTablesClient() {
  const view = useSearchParams().get('view') ?? undefined;

  return (
    <VirtualTableManager virtualTable={view} containerStyle={managerStyle} />
  );
}
