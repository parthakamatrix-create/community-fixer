import { ReportCategory, CATEGORIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: ReportCategory;
  className?: string;
  showIcon?: boolean;
}

export function CategoryBadge({ category, className, showIcon = true }: CategoryBadgeProps) {
  const config = CATEGORIES.find(c => c.value === category);
  
  if (!config) return null;
  
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground',
      className
    )}>
      {showIcon && <span>{config.icon}</span>}
      {config.label}
    </span>
  );
}
