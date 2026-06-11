'use client';

import { AdminProvider } from '@quillsql/admin';

type AdminProviderClientProps = {
  children: unknown;
  publicKey: string;
  queryEndpoint: string;
};

export default function AdminProviderClient({
  children,
  publicKey,
  queryEndpoint,
}: AdminProviderClientProps) {
  return (
    <AdminProvider queryEndpoint={queryEndpoint} publicKey={publicKey}>
      {children as never}
    </AdminProvider>
  );
}
