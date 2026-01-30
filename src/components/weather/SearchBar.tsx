import { useState, FormEvent } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useWeather } from '@/context/WeatherContext';
import { motion } from 'framer-motion';

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
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <div className="flex-1 flex items-center gap-3 bg-input rounded-xl px-4 py-3 border-2 border-border">
            <Search className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a city..."
              className="flex-1 bg-transparent outline-none text-sm font-pixel text-foreground placeholder:text-muted-foreground"
              aria-label="City input"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="pixel-button h-12 w-12"
            title="Search"
            disabled={loading}
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleLocation}
            className="pixel-button h-12 w-12"
            title="Use my location"
            disabled={loading}
          >
            <MapPin className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.section>
  );
};