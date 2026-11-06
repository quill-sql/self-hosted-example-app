import { Suspense } from 'react';
import VirtualTablesClient from './virtual-tables-client';

export default function VirtualTablesPage() {
  return (
    <Suspense fallback={null}>
      <VirtualTablesClient />
    </Suspense>
  );
}
