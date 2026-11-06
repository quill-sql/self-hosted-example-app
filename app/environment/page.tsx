'use client';

import { EnvironmentSettings } from '@quillsql/admin';
import styles from '../shell.module.css';

export default function EnvironmentPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Environment</h1>
        <p className={styles.description}>
          Settings for the environment used by dashboards and virtual tables.
        </p>
      </header>
      <EnvironmentSettings />
    </div>
  );
}
