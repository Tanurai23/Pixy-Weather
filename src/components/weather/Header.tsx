import { motion } from 'framer-motion';
import { useWeather } from '@/context/WeatherContext';
import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const { unit, theme, toggleUnit, toggleTheme } = useWeather();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex justify-between items-center px-4 md:px-6 py-4"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌤️</span>
        <h1 className="text-lg md:text-2xl font-pixel text-card-foreground text-shadow-dark">
          Pixy Weather
        </h1>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleUnit}
          className="pixel-button text-[10px] min-w-[44px]"
          aria-pressed={unit === 'fahrenheit'}
        >
          °{unit === 'celsius' ? 'C' : 'F'}
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="pixel-button w-11 h-11 flex items-center justify-center"
          aria-pressed={theme === 'dark'}
          title="Toggle theme"
        >
          {theme === 'dark' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
};