import { motion } from 'framer-motion';
import { useWeather } from '@/context/WeatherContext';
import { useState, useEffect } from 'react';

import dayBg from '@/assets/backgrounds/day-bg.png';
import nightBg from '@/assets/backgrounds/night-bg.jpg';

export const CurrentWeather = () => {
  const { weatherData, convertTemp, unit, theme } = useWeather();
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setIsFlipping(true);
    const timer = setTimeout(() => setIsFlipping(false), 400);
    return () => clearTimeout(timer);
  }, [unit]);

  if (!weatherData) return null;

  const { current, location } = weatherData;
  const displayTemp = Math.round(convertTemp(current.temp));

  // ✅ Theme-based background
  const backgroundImage = theme === 'dark' ? nightBg : dayBg;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="w-full px-4 md:px-6 mb-6"
      aria-live="polite"
    >
      <div className="relative rounded-2xl overflow-hidden h-72 md:h-80 shadow-lg">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

        {/* Weather Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-4 right-4 text-6xl md:text-8xl z-10"
        >
          {current.icon}
        </motion.div>

        {/* Location */}
        <div className="absolute top-4 left-4 text-white z-10">
          <h2 className="text-lg md:text-xl font-pixel drop-shadow">
            {location.name}
          </h2>
          <p className="text-xs md:text-sm font-pixel opacity-80 mt-1 drop-shadow">
            {location.country}
          </p>
        </div>

        {/* Temperature */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <motion.div
              className={`text-6xl md:text-8xl font-pixel text-white drop-shadow-lg ${
                isFlipping ? 'temp-flip' : ''
              }`}
            >
              {displayTemp}
              <span className="text-4xl md:text-5xl">°</span>
            </motion.div>

            <p className="text-sm md:text-base font-pixel text-white opacity-90 mt-2 capitalize drop-shadow">
              {current.description}
            </p>

            <p className="text-xs font-pixel text-white opacity-70 mt-1 drop-shadow">
              Feels like {Math.round(convertTemp(current.feels_like))}°
            </p>
          </div>
        </div>

      </div>
    </motion.section>
  );
};
