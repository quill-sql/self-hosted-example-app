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
      publicKey={'65809ec85375e445ddc1990e'}
      queryEndpoint={'/api/quill'}
    >
      <CustomDashboard />
    </QuillProvider>
  );
}

function CustomDashboard() {
  const { sections, filters, applyFilters } = useDashboard('dan 3');

  if (sections) {
    return (
      <>
        <ChartsSection
          reports={sections['charts']}
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
    <div className="ml-[100px] mt-[100px]">
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
    return <div></div>;
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
