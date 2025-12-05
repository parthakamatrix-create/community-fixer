export type ReportCategory = 
  | 'pothole'
  | 'streetlight'
  | 'garbage'
  | 'water'
  | 'sidewalk'
  | 'traffic'
  | 'graffiti'
  | 'other';

export type ReportStatus = 'pending' | 'in-progress' | 'resolved';

export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  imageUrl: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  status: ReportStatus;
  createdAt: Date;
  userId: string;
  userName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export const CATEGORIES: { value: ReportCategory; label: string; icon: string; color: string }[] = [
  { value: 'pothole', label: 'Pothole / Road Damage', icon: '🕳️', color: 'category-pothole' },
  { value: 'streetlight', label: 'Broken Streetlight', icon: '💡', color: 'category-streetlight' },
  { value: 'garbage', label: 'Garbage / Waste Issue', icon: '🗑️', color: 'category-garbage' },
  { value: 'water', label: 'Water Leak / Drainage', icon: '💧', color: 'category-water' },
  { value: 'sidewalk', label: 'Sidewalk Damage', icon: '🚶', color: 'category-sidewalk' },
  { value: 'traffic', label: 'Traffic Signal Issue', icon: '🚦', color: 'category-traffic' },
  { value: 'graffiti', label: 'Graffiti / Vandalism', icon: '🎨', color: 'category-graffiti' },
  { value: 'other', label: 'Other', icon: '📋', color: 'category-other' },
];
