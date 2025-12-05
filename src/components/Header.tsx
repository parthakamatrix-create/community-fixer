import { Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">LocalFix</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/reports"
              className={`text-sm font-medium transition-colors ${
                isActive('/reports') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              View Reports
            </Link>
            <Link
              to="/submit"
              className={`text-sm font-medium transition-colors ${
                isActive('/submit') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Report Problem
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/submit">
              <Button size="sm">Report Now</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg ${isActive('/') ? 'bg-accent text-accent-foreground' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/reports"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg ${isActive('/reports') ? 'bg-accent text-accent-foreground' : ''}`}
              >
                View Reports
              </Link>
              <Link
                to="/submit"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg ${isActive('/submit') ? 'bg-accent text-accent-foreground' : ''}`}
              >
                Report Problem
              </Link>
              <div className="flex gap-2 px-4 pt-2">
                <Link to="/auth" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/submit" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Report</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
