'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { AdminProvider, DashboardManager } from '@quillsql/admin';

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

      window.removeEventListener('popstate', onPopState);
      window.history.back();
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <AdminProvider queryEndpoint={queryEndpoint} publicKey={publicKey}>
      <div
        style={{
          position: 'fixed',
          top: 8,
          left: 12,
          display: 'flex',
          gap: 6,
          zIndex: 1000,
        }}
      >
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
      <div
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {pathname === '/' ? (
          <DashboardManager
            navigateToVirtualTableManager={(view?: string) => {
              router.push(`/virtual-tables?view=${view ?? ''}`);
            }}
            navigateToReportBuilder={(report) => {
              const params = new URLSearchParams();
              if (report.reportId) params.set('reportId', report.reportId);
              if (report.destinationDashboardName) {
                params.set(
                  'destinationDashboardName',
                  report.destinationDashboardName,
                );
              }
              if (report.virtualQuery) {
                params.set('virtualQuery', report.virtualQuery);
              }
              router.push(`/report-builder?${params.toString()}`);
            }}
            containerStyle={{
              width: '100%',
              height: '100%',
            }}
          />
        ) : (
          (children as never)
        )}
      </div>
    </AdminProvider>
  );
}
