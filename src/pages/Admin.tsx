import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { StatusBadge } from '@/components/StatusBadge';
import { CategoryBadge } from '@/components/CategoryBadge';
import { Button } from '@/components/ui/button';
import { getReports, updateReportStatus } from '@/lib/reportStore';
import { Report, ReportStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';

export default function Admin() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem('localfix_user');
    if (!user) {
      toast({
        title: "Access Denied",
        description: "Please log in to access the admin panel.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    const userData = JSON.parse(user);
    // Simple admin check - in production this would be a proper role system
    if (userData.email === 'admin@localfix.com') {
      setIsAdmin(true);
      setReports(getReports());
    } else {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const handleStatusChange = (id: string, status: ReportStatus) => {
    updateReportStatus(id, status);
    setReports(getReports());
    toast({
      title: "Status Updated",
      description: `Report has been marked as ${status.replace('-', ' ')}.`,
    });
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage report statuses</p>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground text-lg">No reports to manage yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div 
                key={report.id} 
                className="bg-card rounded-xl border border-border p-6 flex flex-col lg:flex-row gap-6"
              >
                {report.imageUrl && (
                  <img 
                    src={report.imageUrl} 
                    alt={report.title}
                    className="w-full lg:w-48 h-32 object-cover rounded-lg"
                  />
                )}
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <CategoryBadge category={report.category} />
                    <StatusBadge status={report.status} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate max-w-[200px]">{report.location.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{format(report.createdAt, 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 lg:w-48">
                  <p className="text-xs text-muted-foreground font-medium uppercase">Update Status</p>
                  {report.status !== 'pending' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(report.id, 'pending')}
                    >
                      Mark Pending
                    </Button>
                  )}
                  {report.status !== 'in-progress' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                      onClick={() => handleStatusChange(report.id, 'in-progress')}
                    >
                      Mark In Progress
                    </Button>
                  )}
                  {report.status !== 'resolved' && (
                    <Button 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(report.id, 'resolved')}
                    >
                      Mark Resolved
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
