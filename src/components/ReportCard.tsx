import { Report } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { CategoryBadge } from './CategoryBadge';
import { MapPin, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={report.imageUrl} 
          alt={report.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge status={report.status} />
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{report.title}</h3>
        </div>
        
        <CategoryBadge category={report.category} />
        
        <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{report.location.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{format(report.createdAt, 'MMM d, yyyy • h:mm a')}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 flex-shrink-0" />
            <span>{report.userName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
