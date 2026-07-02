'use client';
import {
  QuillProvider,
  useDashboard,
  useDashboardReport,
  StaticChart,
} from '@quillsql/react';

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
  const { sections, applyFilters } = useDashboard('<dashboard-name>');

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
  const { report, loading } = useDashboardReport(reportId);
  if (loading) {
    return (
      <div className="flex h-[300px] w-[400px] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600"
          role="status"
          aria-label="Loading chart"
        />
      </div>
    );
  }
  return (
    <div>
      <StaticChart
        reportId={report!.id}
        onClickLegendElement={(e) => {
          applyFilters([{ label: 'Category', value: e.dataKey }]);
        }}
      />
    </div>
  );
}
