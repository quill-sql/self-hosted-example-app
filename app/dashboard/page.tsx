'use client';
import { QuillProvider, useDashboard, StaticChart } from '@quillsql/react';

export default function DashboardPage() {
  return (
    <QuillProvider
      publicKey={process.env.QUILL_PUBLIC_KEY!}
      queryEndpoint={'/api/quill'}
    >
      <CustomDashboard />
    </QuillProvider>
  );
}

function CustomDashboard() {
  const { sections, applyFilters } = useDashboard('<dashboard>');

  if (sections) {
    return (
      <>
        <ChartsSection
          reports={sections['<dashboard-section>']}
          applyFilters={applyFilters}
        />
      </>
    );
  }
}

function ChartsSection({
  reports,
  applyFilters,
}: {
  reports: unknown[];
  applyFilters: (e: any) => void;
}) {
  return (
    <div className="ml-[100px] mt-[100px] flex gap-[100px]">
      {reports.map((report: any) => (
        <ChartCard
          key={report.id}
          reportId={report.id}
          applyFilters={applyFilters}
        />
      ))}
    </div>
  );
}

function ChartCard({
  reportId,
  applyFilters,
}: {
  reportId: string;
  applyFilters: (e: any) => void;
}) {
  return (
    <div>
      <StaticChart
        reportId={reportId}
        onClickLegendElement={(e) => {
          applyFilters([{ label: 'Category', value: e.dataKey }]);
        }}
      />
    </div>
  );
}
