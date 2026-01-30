import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { useWeather } from '@/context/WeatherContext';

export const WelcomeState = () => {
  const { fetchWeatherByCity, fetchWeatherByCoords } = useWeather();

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeatherByCity('New York');
        }
      );
    } else {
      fetchWeatherByCity('New York');
    }
  };

  const popularCities = ['Tokyo', 'Paris', 'New York', 'London', 'Sydney'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 md:px-6"
    >
      <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 text-center border border-border shadow-lg">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          🌤️
        </motion.div>
        
        <h2 className="text-lg md:text-xl font-pixel text-card-foreground mb-2">
          Welcome to Pixy Weather!
        </h2>
        <p className="text-xs font-pixel text-muted-foreground mb-8 max-w-md mx-auto">
          Search for a city or use your location to get started
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLocation}
          className="pixel-button inline-flex items-center gap-2 mb-8"
        >
          <MapPin className="w-4 h-4" />
          <span>Use My Location</span>
        </motion.button>

        <div className="border-t border-border pt-6">
          <p className="text-[10px] font-pixel text-muted-foreground mb-4">
            Or try a popular city:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCities.map((city, index) => (
              <motion.button
                key={city}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchWeatherByCity(city)}
                className="pixel-button text-[8px] px-3 py-2"
              >
                {city}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};