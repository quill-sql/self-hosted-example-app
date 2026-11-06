'use client';

import { EnvironmentSwitcherWithModals } from '@quillsql/admin';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import styles from './shell.module.css';

const navItems = [
  { href: '/', label: 'Dashboards' },
  { href: '/virtual-tables', label: 'Virtual tables' },
  { href: '/environment', label: 'Environment' },
];

function isCurrent(pathname: string, href: string) {
  return href === '/' ? pathname === href : pathname.startsWith(href);
}

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>Admin</div>
        <nav className={styles.nav} aria-label="Admin">
          <ul className={styles.navList}>
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className={styles.navLink}
                  href={href}
                  aria-current={isCurrent(pathname, href) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.footer}>
          <EnvironmentSwitcherWithModals
            layout="stacked"
            menuPlacement="top"
            showManageOption={pathname !== '/environment'}
          />
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
