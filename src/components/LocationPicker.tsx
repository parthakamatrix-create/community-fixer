import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

interface LocationPickerProps {
  value: { address: string; lat: number; lng: number };
  onChange: (location: { address: string; lat: number; lng: number }) => void;
}

// Pune and PCMC bounding box (approximate)
const PUNE_PCMC_BOUNDS = {
  minLat: 18.35,
  maxLat: 18.75,
  minLng: 73.65,
  maxLng: 74.05,
};

const isWithinPunePCMC = (lat: number, lng: number): boolean => {
  return (
    lat >= PUNE_PCMC_BOUNDS.minLat &&
    lat <= PUNE_PCMC_BOUNDS.maxLat &&
    lng >= PUNE_PCMC_BOUNDS.minLng &&
    lng <= PUNE_PCMC_BOUNDS.maxLng
  );
};

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { toast } = useToast();

  const getCurrentLocation = () => {
    setIsLocating(true);
    setLocationError('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Check if location is within Pune/PCMC
          if (!isWithinPunePCMC(latitude, longitude)) {
            setLocationError('Location must be within Pune or PCMC area only.');
            toast({
              title: 'Location Not Allowed',
              description: 'This platform only accepts reports from Pune and PCMC areas.',
              variant: 'destructive',
            });
            setIsLocating(false);
            return;
          }
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            onChange({
              address: data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
              lat: latitude,
              lng: longitude,
            });
          } catch {
            onChange({
              address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
              lat: latitude,
              lng: longitude,
            });
          }
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Could not get your location. Please enter it manually.');
          setIsLocating(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
      setIsLocating(false);
    }
  };

  // Simple map preview using OpenStreetMap embed
  useEffect(() => {
    if (value.lat && value.lng && mapRef.current) {
      setMapLoaded(true);
    }
  }, [value.lat, value.lng]);

  return (
    <div className="space-y-3">
      <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground flex items-start gap-2">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>Reports are limited to <strong>Pune</strong> and <strong>PCMC</strong> areas only.</span>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Enter location in Pune/PCMC"
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            className="pl-10"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={getCurrentLocation}
          disabled={isLocating}
        >
          <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline ml-2">
            {isLocating ? 'Locating...' : 'Use My Location'}
          </span>
        </Button>
      </div>
      
      {locationError && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {locationError}
        </p>
      )}
      
      {value.lat !== 0 && value.lng !== 0 && (
        <div 
          ref={mapRef}
          className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-muted"
        >
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${value.lng - 0.01}%2C${value.lat - 0.01}%2C${value.lng + 0.01}%2C${value.lat + 0.01}&layer=mapnik&marker=${value.lat}%2C${value.lng}`}
            style={{ border: 0 }}
            title="Location Map"
          />
          <div className="absolute bottom-2 right-2">
            <a
              href={`https://www.openstreetmap.org/?mlat=${value.lat}&mlon=${value.lng}#map=17/${value.lat}/${value.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-card/90 px-2 py-1 rounded text-primary hover:underline"
            >
              View larger map
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
