'use client';

import { AdminProvider, EnvironmentSwitcherWithModals } from '@quillsql/admin';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

const SIDEBAR_KEY = 'sidebar-collapsed';

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const navItems = [
  {
    href: '/',
    label: 'Dashboards',
    icon: (
      <Icon>
        <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 12h7v8h-7zM4 15h7v5H4z" />
      </Icon>
    ),
  },
  {
    href: '/virtual-tables',
    label: 'Virtual tables',
    icon: (
      <Icon>
        <ellipse cx="12" cy="6" rx="7" ry="2.5" />
        <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
        <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
      </Icon>
    ),
  },
  {
    href: '/environment',
    label: 'Environment',
    icon: (
      <Icon>
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4" />
      </Icon>
    ),
  },
];

export function reportBuilderPath(report: {
  reportId?: string;
  destinationDashboardName?: string;
  virtualQuery?: string;
}) {
  const params = new URLSearchParams();
  if (report.reportId) params.set('reportId', report.reportId);
  if (report.destinationDashboardName) {
    params.set('destinationDashboardName', report.destinationDashboardName);
  }
  if (report.virtualQuery) params.set('virtualQuery', report.virtualQuery);
  const query = params.toString();
  return query ? `/report-builder?${query}` : '/report-builder';
}

export default function Shell({
  children,
  publicKey,
}: {
  children: ReactNode;
  publicKey: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem(SIDEBAR_KEY) === 'true');
  }, []);

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem(SIDEBAR_KEY, String(next));
      return next;
    });
  }

  return (
    <AdminProvider
      publicKey={publicKey}
      queryEndpoint="/api/quill"
      hideEnvDropdown
      navigateToReportBuilder={(report) => router.push(reportBuilderPath(report))}
    >
      <div className="shell">
        <nav aria-label="Admin" data-collapsed={collapsed || undefined}>
          <button
            className="nav-toggle"
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            onClick={toggleCollapsed}
          >
            <Icon>
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M9 4v16" />
            </Icon>
          </button>
          {navItems.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              aria-current={
                (href === '/' ? pathname === '/' : pathname.startsWith(href))
                  ? 'page'
                  : undefined
              }
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
          <div className="switcher">
            <EnvironmentSwitcherWithModals
              layout={collapsed ? 'icon' : 'stacked'}
              menuPlacement="top"
            />
          </div>
        </nav>
        <main>{children}</main>
      </div>
    </AdminProvider>
  );
}
