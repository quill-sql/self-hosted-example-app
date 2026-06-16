'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    window.history.pushState({ backGuard: true }, '', window.location.href);
  }, [pathname]);

  useEffect(() => {
    let ignoreNextPopstate = false;

    const onPopState = () => {
      if (ignoreNextPopstate) {
        ignoreNextPopstate = false;
        return;
      }

      const shouldLeave = window.confirm('Save changes before continuing');

      if (!shouldLeave) {
        ignoreNextPopstate = true;
        window.history.go(1);
        return;
      }

      ignoreNextPopstate = true;
      window.history.back();
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <AdminProvider queryEndpoint={queryEndpoint} publicKey={publicKey}>
      <div style={{ position: 'fixed', top: 8, left: 12, display: 'flex', gap: 6, zIndex: 1000 }}>
        <button
          onClick={() => {
            router.push('/');
          }}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid rgb(229, 231, 235)',
            height: 32,
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 6,
            padding: '0 12px',
            cursor: 'pointer',
          }}
        >
          Dashboards
        </button>
        <button
          onClick={() => {
            router.push('/virtual-tables');
          }}
          style={{
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            height: 32,
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 6,
            padding: '0 12px',
            cursor: 'pointer',
          }}
        >
          Virtual Tables
        </button>
      </div>
      {children as never}
    </AdminProvider>
  );
}
