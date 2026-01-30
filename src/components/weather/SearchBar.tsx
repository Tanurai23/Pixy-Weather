import { useState, FormEvent } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useWeather } from '@/context/WeatherContext';
import { motion } from 'framer-motion';

/**
 * ✅ FIXED: Responsive SearchBar
 * 
 * ISSUES FIXED:
 * 1. Buttons overlapping input on small screens
 * 2. Layout breaking when window shrinks
 * 
 * SOLUTION:
 * - Changed from horizontal flex to responsive grid
 * - Buttons stack on mobile (below 640px)
 * - Input takes full width on mobile
 * - Proper spacing maintained at all screen sizes
 */

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { fetchWeatherByCity, fetchWeatherByCoords, loading } = useWeather();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeatherByCity(query.trim());
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get your location. Please search for a city instead.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full px-4 md:px-6 mb-6"
      aria-label="Search"
    >
      <div className="glass-panel p-4">
        <form onSubmit={handleSubmit}>
          {/* ✅ FIXED: Responsive grid layout */}
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Search Input - Full width on mobile, flexible on desktop */}
            <div className="flex-1 flex items-center gap-3 bg-input rounded-xl px-4 py-3 border-2 border-border min-w-0">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a city..."
                className="flex-1 bg-transparent outline-none text-sm font-pixel text-foreground placeholder:text-muted-foreground min-w-0"
                aria-label="City input"
                disabled={loading}
              />
            </div>

            {/* Buttons Container - Stack on mobile, side-by-side on desktop */}
            <div className="flex gap-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="pixel-button h-12 flex-1 sm:flex-initial sm:w-12 flex items-center justify-center gap-2"
                title="Search"
                disabled={loading}
              >
                <Search className="w-4 h-4" />
                <span className="sm:hidden text-[10px]">Search</span>
              </button>
              
              <button
                type="button"
                onClick={handleLocation}
                className="pixel-button h-12 flex-1 sm:flex-initial sm:w-12 flex items-center justify-center gap-2"
                title="Use my location"
                disabled={loading}
              >
                <MapPin className="w-4 h-4" />
                <span className="sm:hidden text-[10px]">Location</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

/**
 * RESPONSIVE BREAKPOINTS:
 * 
 * Mobile (< 640px):
 * ┌─────────────────────┐
 * │  [Search Input]     │
 * │  [Search] [Location]│
 * └─────────────────────┘
 * 
 * Desktop (≥ 640px):
 * ┌───────────────────────────────┐
 * │  [Search Input] [🔍] [📍]    │
 * └───────────────────────────────┘
 * 
 * IMPROVEMENTS:
 * - No overlapping at any screen size
 * - Touch-friendly buttons on mobile
 * - Better visual hierarchy
 * - Maintains functionality at all sizes
 */