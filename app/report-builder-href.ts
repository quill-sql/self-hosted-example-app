export function reportBuilderHref(report: {
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

export const managerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
} as const;
