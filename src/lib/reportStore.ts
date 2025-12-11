import { Report, ReportStatus } from './types';

const STORAGE_KEY = 'localfix_reports';

export function getReports(): Report[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  
  const reports = JSON.parse(stored);
  return reports.map((r: Report) => ({
    ...r,
    createdAt: new Date(r.createdAt),
  }));
}

export function addReport(report: Omit<Report, 'id' | 'createdAt' | 'status'>): Report {
  const reports = getReports();
  const newReport: Report = {
    ...report,
    id: Date.now().toString(),
    createdAt: new Date(),
    status: 'pending',
  };
  
  reports.unshift(newReport);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  return newReport;
}

export function updateReportStatus(id: string, status: ReportStatus): void {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  }
}

export function clearAllReports(): void {
  localStorage.removeItem(STORAGE_KEY);
}
