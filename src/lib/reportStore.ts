import { Report, ReportStatus } from './types';

const STORAGE_KEY = 'localfix_reports';

// Demo reports for initial state
const demoReports: Report[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'Deep pothole near the intersection causing damage to vehicles. Needs urgent repair.',
    category: 'pothole',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&h=300&fit=crop',
    location: { address: '123 Main Street, Downtown', lat: 40.7128, lng: -74.006 },
    status: 'in-progress',
    createdAt: new Date('2024-12-01T10:30:00'),
    userId: 'demo',
    userName: 'John Doe',
  },
  {
    id: '2',
    title: 'Streetlight not working',
    description: 'The streetlight has been out for over a week. Area is very dark at night.',
    category: 'streetlight',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    location: { address: '456 Oak Avenue, Westside', lat: 40.7589, lng: -73.9851 },
    status: 'resolved',
    createdAt: new Date('2024-11-28T15:45:00'),
    userId: 'demo',
    userName: 'Jane Smith',
  },
  {
    id: '3',
    title: 'Garbage piling up at corner',
    description: 'Garbage has not been collected for several days. Creating health hazard.',
    category: 'garbage',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    location: { address: '789 Park Road, Eastside', lat: 40.7484, lng: -73.9857 },
    status: 'pending',
    createdAt: new Date('2024-12-03T09:00:00'),
    userId: 'demo',
    userName: 'Mike Johnson',
  },
];

export function getReports(): Report[] {
  if (typeof window === 'undefined') return demoReports;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoReports));
    return demoReports;
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
