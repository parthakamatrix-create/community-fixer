import { ReportStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ReportStatus;
  className?: string;
}

const statusConfig: Record<ReportStatus, { label: string; className: string }> = {
  resolved: { label: 'Resolved', className: 'bg-status-resolved text-primary-foreground' },
  'in-progress': { label: 'In Progress', className: 'bg-status-in-progress text-primary-foreground' },
  pending: { label: 'Pending', className: 'bg-status-pending text-primary-foreground' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}
