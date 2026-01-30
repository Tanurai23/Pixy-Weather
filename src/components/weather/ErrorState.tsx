import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useWeather } from '@/context/WeatherContext';

interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  const { fetchWeatherByCity } = useWeather();

  const handleRetry = () => {
    fetchWeatherByCity('London'); // Default city
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full px-4 md:px-6"
    >
      <div className="bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-8 text-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
        </motion.div>
        
        <h3 className="text-sm font-pixel text-destructive mb-2">Oops!</h3>
        <p className="text-xs font-pixel text-muted-foreground mb-6 max-w-xs mx-auto">
          {message}
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRetry}
          className="pixel-button inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      </div>
    </motion.div>
  );
};