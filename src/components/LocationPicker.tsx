import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LocationPickerProps {
  value: { address: string; lat: number; lng: number };
  onChange: (location: { address: string; lat: number; lng: number }) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [isLocating, setIsLocating] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const getCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
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
          setIsLocating(false);
        }
      );
    } else {
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
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Enter location address"
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
