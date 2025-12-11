import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Menu, X, Shield, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('localfix_user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setIsAdmin(parsed.email === 'admin@localfix.com');
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('localfix_user');
    setUser(null);
    setIsAdmin(false);
    navigate('/');
  };

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
            {user && (
              <Link
                to="/submit"
                className={`text-sm font-medium transition-colors ${
                  isActive('/submit') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Report Problem
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive('/admin') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
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
              {user && (
                <Link
                  to="/submit"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg ${isActive('/submit') ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  Report Problem
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isActive('/admin') ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}
              <div className="flex gap-2 px-4 pt-2">
                {user ? (
                  <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/auth" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/auth" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
