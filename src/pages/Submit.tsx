import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ImageUpload';
import { LocationPicker } from '@/components/LocationPicker';
import { CATEGORIES, ReportCategory } from '@/lib/types';
import { addReport } from '@/lib/reportStore';
import { useToast } from '@/hooks/use-toast';
import { Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Submit() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as ReportCategory | '',
    imageUrl: '',
    location: { address: '', lat: 0, lng: 0 },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast({
        title: 'Category Required',
        description: 'Please select a problem category.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.imageUrl) {
      toast({
        title: 'Photo Required',
        description: 'Please upload a photo of the problem.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.location.address) {
      toast({
        title: 'Location Required',
        description: 'Please provide the location of the problem.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Get user from localStorage or use default
    const storedUser = localStorage.getItem('localfix_user');
    const user = storedUser ? JSON.parse(storedUser) : { name: 'Anonymous', email: '' };
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addReport({
      title: formData.title,
      description: formData.description,
      category: formData.category as ReportCategory,
      imageUrl: formData.imageUrl,
      location: formData.location,
      userId: user.email || 'anonymous',
      userName: user.name || 'Anonymous',
    });
    
    toast({
      title: 'Report Submitted!',
      description: 'Thank you for reporting this issue. We will look into it.',
    });
    
    navigate('/reports');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Report a Problem</h1>
            <p className="text-muted-foreground">
              Help improve your community by reporting local issues
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Problem Category *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                      formData.category === cat.value
                        ? 'border-primary bg-accent'
                        : 'border-border bg-card hover:border-primary/50'
                    )}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-xs text-center font-medium text-foreground">
                      {cat.label.split('/')[0]}
                    </span>
                    {formData.category === cat.value && (
                      <CheckCircle className="w-4 h-4 text-primary absolute top-2 right-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">Problem Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Large pothole on Main Street"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the problem, its severity, and any safety concerns..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>
            
            {/* Photo Upload */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Photo *</Label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              />
            </div>
            
            {/* Location */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Location *</Label>
              <LocationPicker
                value={formData.location}
                onChange={(location) => setFormData({ ...formData, location })}
              />
            </div>
            
            {/* Timestamp Display */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Submission Time:</strong>{' '}
                {new Date().toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This timestamp will be automatically recorded when you submit
              </p>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              size="xl" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
