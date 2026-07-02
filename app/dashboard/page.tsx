'use client';
import {
  QuillProvider,
  useDashboard,
  useDashboardReport,
  StaticChart,
} from '@quillsql/react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/*export default function DashboardPage() {
  return (
    <QuillProvider
      tenants={[{ tenantField: 'customer_id', tenantIds: ['3'] }]}
      publicKey={'6a3d8b9a745f26209e424ae5'}
      queryEndpoint={'/api/quill'}
    >
      <Dashboard name="Dan" onClickReport={() => {}} />;
    </QuillProvider>
  );
}*/

export default function DashboardPage() {
  console.log('RENDERING DASHBOARD');
  return (
    <QuillProvider
      tenants={[{ tenantField: 'customer_id', tenantIds: [2] }]}
      publicKey={'6a3d8b9a745f26209e424ae5'}
      queryEndpoint={'/api/quill'}
    >
      <CustomDashboard />
    </QuillProvider>
  );
}

function CustomDashboard() {
  const { sections, isLoading } = useDashboard('Dan');

  if (!isLoading) {
    return (
      <>
        <ChartsSection reports={sections!['charts']} />
      </>
    );
  }
}

function ChartsSection({ reports }: { reports: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
      {reports.map((report: any) => (
        <ChartCard key={report.id} reportId={report.id} name={report.name} />
      ))}
    </div>
  );
}

function ChartCard({ reportId, name }) {
  const { report, loading } = useDashboardReport(reportId);
  if (loading) {
    return (
      <div className="lg:col-span-1">
        <Card
          className="h-full shadow-none bg-transparent border-none"
          title={name}
        >
          <Skeleton />
        </Card>
      </div>
    );
  }
  return (
    <div className="lg:col-span-1">
      <Card
        className="h-full shadow-none bg-transparent border-none"
        title={name}
      >
        <StaticChart reportId={report!.id} />
      </Card>
    </div>
  );
}
