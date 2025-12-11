import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { MapPin, FileText, CheckCircle, Users, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Pin the Problem',
    description: 'Report issues with precise location using GPS or manual entry.',
  },
  {
    icon: FileText,
    title: 'Describe the Issue',
    description: 'Add photos and detailed descriptions to help authorities understand.',
  },
  {
    icon: CheckCircle,
    title: 'Track Progress',
    description: 'Monitor the status of your reports from pending to resolved.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join neighbors in making your community a better place.',
  },
];

const stats = [
  { value: '0', label: 'Issues Reported' },
  { value: '0', label: 'Resolved Rate' },
  { value: '0', label: 'Neighborhoods' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Community-Powered Civic Reporting
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Let's save the environment{' '}
              <span className="text-primary">together.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Report local civic problems like potholes, broken streetlights, garbage piles, 
              and water leaks. Help authorities fix issues faster by providing accurate information.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/auth">
                <Button variant="hero" size="xl">
                  Login / Sign Up
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/reports">
                <Button variant="outline" size="xl">
                  View Reports
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Making your community better is just a few clicks away
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join hundreds of community members who are actively improving their neighborhoods.
          </p>
          <Link to="/auth">
            <Button variant="secondary" size="xl">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">LocalFix</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 LocalFix. Building better communities together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
