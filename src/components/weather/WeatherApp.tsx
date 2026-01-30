import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '@/context/WeatherContext';
import { Stars } from './Stars';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { HourlyForecast } from './HourlyForecast';
import { WeeklyForecast } from './WeeklyForecast';
import { WeatherDetails } from './WeatherDetails';
import { ForecastChart } from './ForecastChart';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { WelcomeState } from './WelcomeState';

export const WeatherApp = () => {
  const { weatherData, loading, error, theme } = useWeather();

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated stars for dark mode */}
      <Stars />

      {/* Moon glow for dark mode */}
      {theme === 'dark' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="fixed top-10 right-10 w-32 h-32 rounded-full bg-accent/30 blur-3xl pointer-events-none z-0"
          aria-hidden="true"
        />
      )}

      {/* Main app container */}
      <main className="relative z-10 flex justify-center py-6 md:py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="weather-card-main w-full max-w-lg md:max-w-xl"
        >
          <Header />
          <SearchBar />

          {/* Content states */}
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} />
          ) : weatherData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <CurrentWeather />
              <HourlyForecast />
              <WeeklyForecast />
              <ForecastChart />
              <WeatherDetails />
            </motion.div>
          ) : (
            <WelcomeState />
          )}

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center py-4 px-4"
          >
            <p className="text-[8px] font-pixel text-card-foreground/60">
              Powered by OpenWeatherMap ⛅
            </p>
          </motion.footer>
        </motion.div>
      </main>
    </div>
  );
};